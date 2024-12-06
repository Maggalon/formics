interface ShortTextProps {
    placeholder: string;
    label: string;
}

export const ShortText: React.FC<ShortTextProps> = ({ placeholder, label }) => {
    return (
        <div>
            <label htmlFor="large-input" className="mb-2 text-md font-medium text-gray-900">{label}</label>
            <input type="text" 
                   id="large-input" 
                   placeholder={placeholder}
                   className="w-full max-w-lg pb-2 text-gray-800 text-xl placeholder:text-gray-600 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-800" />
        </div>    
    )
}