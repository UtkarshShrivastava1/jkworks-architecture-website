const Input = ({ type, placeholder, value, onChange }) => (
    <input type={type} placeholder={placeholder} value={value}
      onChange={onChange} className="input" required />
  );
  
  export default Input;
  