interface BottomMenuProps {
    buttonText: string;
}

export const BottomMenu: React.FC<BottomMenuProps> = ({ buttonText }) => {
    return (
        <div className="fixed flex justify-center items-center bottom-0 left-0 z-50 w-full h-24 bg-white/50 px-4">
            <div className="w-full max-w-lg flex justify-center items-center">
                <button type="button" className="flex-none bg-[#0083B0] p-3 mr-3 rounded-lg">
                    <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        className="h-6 w-6 text-white"
                        >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={48}
                            d="M328 112L184 256l144 144"
                        />
                    </svg>
                </button>
                <button type="button" className="flex-1 bg-[#0083B0] p-3 rounded-lg font-bold text-white">{buttonText}</button>
            </div>
        </div>
    )
}