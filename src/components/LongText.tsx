import TextareaAutosize from "react-textarea-autosize"

interface LongTextProps {
    placeholder: string;
    label: string;
    onChange: (value: string) => void;
    value: string;
}

export const LongText: React.FC<LongTextProps> = ({ placeholder, label, onChange, value }) => {
    return (
        <div>
            <label htmlFor="large-input" className="mb-2 text-md font-medium text-gray-900">{label}</label>
            <TextareaAutosize id="textarea" 
                              placeholder={placeholder} 
                              value={value}
                              onChange={e => onChange(e.target.value)}
                              className="resize-none w-full max-w-lg pb-2 text-gray-800 text-xl placeholder:text-gray-600 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-800" />
        </div>    
    )
}