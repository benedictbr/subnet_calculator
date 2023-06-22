/** @format */
import Input from "./input";
import "./inputGrid.css";
import { useState, useEffect } from "react";
import calculateSubnets from "../utils/subnetCalc";

function InputGrid({ names }) {
	const [formData, setFormData] = useState({ subnetMask: "", ip: "", subnetNum: "" });
	const [subnets, setSubnets] = useState([{ empty: "true" }]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};
	useEffect(() => {
		console.log(subnets);
	}, subnets);
	const handleSubmit = (event) => {
		event.preventDefault();
		alert(`IP: ${formData.ip}, Mask: ${formData.subnetMask}, Subnets: ${formData.subnetNum}`);
		const subnets_ = calculateSubnets(formData.ip, formData.subnetMask, formData.subnetNum);
		setSubnets(subnets_);
	};

	return (
		<div className='inputGrid'>
			<form
				className='input-form'
				onSubmit={handleSubmit}>
				<Input
					name='IP Address'
					name_usable='ip'
					value={formData.ip}
					onChangeFunc={handleChange}
				/>
				<Input
					name='Subnet Mask'
					name_usable='subnetMask'
					value={formData.subnetMask}
					onChangeFunc={handleChange}
				/>

				<Input
					name='# of Subnets'
					name_usable='subnetNum'
					value={formData.subnetNum}
					onChangeFunc={handleChange}
				/>
				<button
					className='submit'
					type='submit'>
					Submit
				</button>
			</form>
			{subnets.map((subnet, index) => {
				return subnet?.empty === "true" ? null : (
					<div className='subnet-info'>
						<h3>{`Subnet #${index + 1}`}</h3>
						<h4>
							Network Address: <span style={{ fontWeight: "bolder" }}>{subnet.networkAddress}</span>
						</h4>
						<h4>
							Broadcast Address: <span style={{ fontWeight: "bolder" }}>{subnet.broadcastAddress}</span>
						</h4>
						<h4>
							Subnet Mask: <span style={{ fontWeight: "bolder" }}>{subnet.subnetMask}</span>
						</h4>
					</div>
				);
			})}
		</div>
	);
}
export default InputGrid;
