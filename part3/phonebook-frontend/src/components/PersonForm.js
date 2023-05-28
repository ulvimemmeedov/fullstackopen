const PersonForm = ({
  onSubmit,
  valueName,
  onChangeName,
  valueNumber,
  onChangeNumber,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={valueName} onChange={onChangeName} />
    </div>
    <div>
      number: <input type="tel" value={valueNumber} onChange={onChangeNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
