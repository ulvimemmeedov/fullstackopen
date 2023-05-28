import PropTypes from 'prop-types';

const FormInput = ({ label, value, onChange }) => (
  <label>
    {label} <input value={value} onChange={onChange}></input>
  </label>
);

FormInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormInput;
