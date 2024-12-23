interface HeaderProps {
    content: string;
}

export const Header: React.FC<HeaderProps> = ({ content }) => {
    return (
        <div className="text-3xl font-normal text-gray-800 mb-2">{content}</div>
    )
}