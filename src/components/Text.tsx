const Text = ({children, className}: {children: any, className?: string}) => (
    <span className={`font-sans text-lg antialiased text-sky-500 ${className}`}>{children}</span>
)

export default Text