/** @format */

// Step 1: Read in the IP address, subnet mask, and desired number of subnets

export default function calculateSubnets(ip, mask, subnetAmount) {
	// Step 2: Convert IP address and subnet mask to binary form
	const ipBinary = ip
		.split(".")
		.map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
		.join("");
	const subnetBinary = mask
		.split(".")
		.map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
		.join("");

	// Step 3: Determine subnet mask length in bits
	const subnetMaskLength = subnetBinary.replace(/0+$/, "").length;

	// Step 4: Calculate the number of bits required for subnets
	const bitsRequired = Math.ceil(Math.log2(subnetAmount));

	// Step 5: Determine the new subnet mask length
	const newSubnetMaskLength = subnetMaskLength + bitsRequired;

	// Step 6: Calculate the new subnet mask
	const newSubnetBinary = "1".repeat(newSubnetMaskLength).padEnd(32, "0");
	const newSubnetMask = newSubnetBinary
		.match(/.{8}/g)
		.map((byte) => parseInt(byte, 2))
		.join(".");

	// Step 7: Calculate the subnet size
	const subnetSize = Math.pow(2, 32 - newSubnetMaskLength);

	// Step 8: Calculate the network address
	const networkAddressBinary = ipBinary.substr(0, newSubnetMaskLength).padEnd(32, "0");
	const networkAddress = networkAddressBinary
		.match(/.{8}/g)
		.map((byte) => parseInt(byte, 2))
		.join(".");

	// Step 9: Calculate the broadcast address
	const broadcastAddressBinary = ipBinary.substr(0, newSubnetMaskLength).padEnd(32, "1");
	const broadcastAddress = broadcastAddressBinary
		.match(/.{8}/g)
		.map((byte) => parseInt(byte, 2))
		.join(".");

	// Step 10: Calculate network and broadcast addresses for each subsequent subnet
	const subnets = [];
	let currentNetworkAddress = networkAddress;
	for (let i = 0; i < subnetAmount; i++) {
		const subnet = {
			networkAddress: currentNetworkAddress,
			broadcastAddress: incrementIPAddress(currentNetworkAddress, subnetSize - 1),
			subnetMask: newSubnetMask,
		};
		subnets.push(subnet);
		currentNetworkAddress = incrementIPAddress(currentNetworkAddress, subnetSize);
	}

	// Step 11: Display the results
	console.log("Subnet Information:");
	console.log("--------------------");
	subnets.forEach((subnet, index) => {
		console.log(`Subnet ${index + 1}:`);
		console.log(`Network Address: ${subnet.networkAddress}`);
		console.log(`Broadcast Address: ${subnet.broadcastAddress}`);
		console.log(`Subnet Mask: ${subnet.subnetMask}`);
		console.log("--------------------");
	});
	return subnets;
}
// Helper function to increment an IP address
function incrementIPAddress(ipAddress, increment) {
	const parts = ipAddress.split(".").map((octet) => parseInt(octet));
	let carry = increment;
	for (let i = parts.length - 1; i >= 0 && carry > 0; i--) {
		const sum = parts[i] + carry;
		parts[i] = sum % 256;
		carry = Math.floor(sum / 256);
	}
	return parts.join(".");
}

calculateSubnets("192.168.0.0", "255.255.255.0", 4);
