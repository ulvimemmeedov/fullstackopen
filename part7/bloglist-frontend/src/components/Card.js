const Card = ({ title, children }) => (
  <div className="p-6 ring-1 ring-slate-200 shadow-lg hover:shadow-xl rounded transition-shadow duration-300">
    {title && <p className="pb-4 text-lg">{title}</p>}
    {children}
  </div>
);

export default Card;
