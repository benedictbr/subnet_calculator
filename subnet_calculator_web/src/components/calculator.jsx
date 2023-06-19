/** @format */
import InputGrid from "./inputGrid";

const inputs = ["IP Address", "Subnet Mask", " # of Subnets"];

function Calculator() {
	return (
		<div>
			<InputGrid names={inputs} />
		</div>
	);
}
export default Calculator;
