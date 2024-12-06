interface EmailProps {
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
}

export const Email: React.FC<EmailProps> = ({ placeholder, onChange, value }) => {
    return (
        <div>
            <label htmlFor="large-input" className="mb-2 text-md font-medium text-gray-900">Email</label>
            <input type="email" 
                   id="large-input" 
                   placeholder={placeholder}
                   value={value}
                   onChange={e => onChange(e.target.value)}
                   className="w-full max-w-lg py-2 text-gray-800 text-xl placeholder:text-gray-600 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-800" />
        </div>    
    )
}