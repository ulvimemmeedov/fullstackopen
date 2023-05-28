import PropTypes from 'prop-types';

const FormInput = ({ label, value, placeholder, required, type, onChange }) => (
  <label className="flex flex-col">
    {label && <span className="pb-1">{label}</span>}
    <input
      className="px-1 bg-slate-100 rounded border focus-visible:ring-2 ring-slate-200 outline-none"
      value={value}
      placeholder={placeholder}
      required={required}
      type={type}
      onChange={onChange}
    ></input>
  </label>
);

FormInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FormInput;
