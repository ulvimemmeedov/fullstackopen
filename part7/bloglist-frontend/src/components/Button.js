const Button = ({ children, type, primary, onClick }) => (
  <button
    className={`p-1 rounded font-semibold text-sm border border-slate-300 focus:ring-2 ring-slate-200 outline-none ${
      !primary && 'bg-slate-50 text-slate-600'
    } ${primary && 'bg-slate-500 text-slate-50'}`}
    type={type ?? 'submit'}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
