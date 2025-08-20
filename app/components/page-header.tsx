
interface PageHeaderProps {
    title: string;
    desc: string;
}

export function PageHeader({ title, desc }: PageHeaderProps) {
    return (
        <div className="border-b-2 pb-4 mb-8">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-muted-foreground ">{desc}</p>
        </div>
    )
}