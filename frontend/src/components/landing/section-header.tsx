export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="container">
      <span className="sub-heading">{eyebrow}</span>
      <h2 className="secondary-heading">{title}</h2>
    </div>
  );
}
