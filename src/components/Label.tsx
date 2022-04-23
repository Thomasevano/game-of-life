const Label = ({ label, className }: { label: string, className?: string }) => (
  <label htmlFor={label} className={`font-sans text-lg antialiased text-sky-500 ${className}`}>{label}</label>
)

export default Label
