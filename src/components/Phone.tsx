

export const Phone = ({ placeholder }) => {
    return (
        <div>
            <label htmlFor="large-input" className="mb-2 text-md font-medium text-gray-900">Phone number</label>
            <div className="flex items-center">
                <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-600 mr-4"
                    >
                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64c0 247.4 200.6 448 448 448 18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368c-70.4-33.3-127.4-90.3-160.7-160.7l49.3-40.3c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                <input type="text" 
                    id="large-input" 
                    placeholder={placeholder}
                    className="w-full max-w-lg py-2 text-gray-800 text-xl placeholder:text-gray-600 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-gray-800" />
            </div>
        </div>    
    )
}