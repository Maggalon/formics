interface DescriptionProps {
    content: string;
}

export const Description: React.FC<DescriptionProps> = ({ content }) => {
    return (
        <div className="text-xl font-normal text-gray-600 mb-10">{content}</div>
    )
}