/** @format */
import "./input.css";
function Input({ name, name_usable, value, onChangeFunc }) {
	return (
		<div className='input-wrapper'>
			<label for={name_usable}>{name}</label>
			<input
				id={name_usable}
				name={name_usable}
				type='text'
				value={value}
				onChange={onChangeFunc}
			/>
		</div>
	);
}
export default Input;
