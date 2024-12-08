/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash } from "lucide-react"
import { ReactElement, useState } from "react";
import { Modal } from "./Modal";
import TextareaAutosize from "react-textarea-autosize";

interface FormField {
    id?: number;
    type?: string;
    name?: string;
    header?: string;
    description?: string;
    props?: any;
}

interface FormFieldCardProps {
    icon: {
        icon: ReactElement,
        text: string,
        type: string
    };
    field: FormField;
    handleDelete: (fieldId: number) => void
}

interface OptionProps {
    id: string;
    content: string;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const FormFieldCard = ({ icon, field, handleDelete }: FormFieldCardProps) => {
    
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<OptionProps[]>([])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAddOption = () => {
        const newOption: OptionProps = {
            id: alphabet[options?.length],
            content: "Test"
        }

        setOptions([...options, newOption])
    }

    return (
        <>
        <div onClick={handleOpen} className="w-full bg-white p-4 rounded-lg mb-2">
            <div className="text-lg font-semibold mb-2">{field.header}</div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="mr-1">{icon.icon}</div>
                    <div>{field.type}</div>
                </div>
                <Trash onClick={() => handleDelete(field.id!)} />
            </div>
        </div>
        <Modal isOpen={open} onClose={handleClose}>
            <>
                <div>
                    <label htmlFor="name">Field name (displayed in responses)</label>
                    <input type="text" id="name" className="w-full border border-black rounded-md p-2 focus:outline-none my-2" />
                </div>
                <div>
                    <label htmlFor="header">Field header</label>
                    <input type="text" id="header" className="w-full border border-black rounded-md p-2 focus:outline-none my-2" />
                </div>
                <div>
                    <label htmlFor="description">Field description</label>
                    <TextareaAutosize id="description" className="w-full border border-black rounded-md p-2 focus:outline-none my-2" />
                </div>
                {
                    field.type === "short-text" || field.type === "long-text"
                    ?
                        <>
                        <div>
                            <label htmlFor="label">Field label (optional)</label>
                            <input type="text" id="label" className="w-full border border-black rounded-md p-2 focus:outline-none my-2" />
                        </div>
                        <div>
                            <label htmlFor="placeholder">Field placeholder (optional)</label>
                            <input type="text" id="placeholder" className="w-full border border-black rounded-md p-2 focus:outline-none mt-2 mb-4" />
                        </div>
                        </>
                    : field.type === "email" || field.type === "phone"
                    ?
                        <div>
                            <label htmlFor="placeholder">Field placeholder (optional)</label>
                            <input type="text" id="placeholder" className="w-full border border-black rounded-md p-2 focus:outline-none mt-2 mb-4" />
                        </div>
                    : field.type === "multiple-choice"
                    ?
                        <>
                        <div className="text-lg mb-2 font-semibold">Options</div>
                        {
                            options.map(option => {
                                return (
                                    <div className="flex items-center">
                                        <div className="mr-2 text-lg font-semibold">{option.id}</div>
                                        <div className="text-lg">{option.content}</div>
                                    </div>
                                )
                            })
                        }
                        <div onClick={handleAddOption} className="text-blue-500 mb-4 underline">Add option</div>
                        <div className="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value="" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                            <label htmlFor="default-checkbox" className="ms-2 text-lg font-medium text-gray-900">Multi select</label>
                        </div>
                        </>
                    : <></>
                }
            </>
        </Modal>
        </>
    )
}