// Reusable message block for empty results, errors, and empty lists.
export default function EmptyState({ icon: Icon, title, text, tone = "neutral", children }) {
  return (
    <div className={`empty ${tone}`} role={tone === "error" ? "alert" : undefined}>
      {Icon && <span className="empty-icon"><Icon size={28} /></span>}
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}
