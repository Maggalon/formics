import { SquarePlus, 
         SendHorizonal, 
         Eye,
         } from "lucide-react"
import { ReactElement, useState } from "react";
import { Modal } from "../components/Modal"
import { optionList } from "../utils/optionList";

interface ListItemProps {
    icon: ReactElement;
    text: string;
}

const ListItem = ({ icon, text }: ListItemProps) => {
    return (
        <li className="text-lg font-semibold mb-4 flex items-center">{icon}<div className="px-1"></div>{text}</li>
    )
}

interface BuilderBottomMenuProps {
    handleAddField: (type: string) => void
}

export const BuilderBottomMenu = ({ handleAddField }: BuilderBottomMenuProps) => {


    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className="fixed flex justify-center items-center bottom-0 left-0 z-50 w-full h-24 bg-[#00B4DB] px-4">
            <div className="mx-6 w-full max-w-lg flex justify-between items-center">
                <Eye size={56} color="white" />  
                <SquarePlus size={56} color="white" onClick={handleOpen} />  
                <SendHorizonal size={56} color="white" />
            </div>
            <Modal isOpen={open} onClose={handleClose}>
                <ul className="list-none list-inside">
                    {
                        optionList.map(({icon, text, type}) => {
                            return <div onClick={() => handleAddField(type)}><ListItem icon={icon} text={text} /></div>
                        })
                    }
                </ul>
            </Modal>
        </div>
    )
}