/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash, X } from "lucide-react"
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

interface OpinionScaleProps {
    min: number;
    max: number;
    labels: {
        start: string;
        end: string;
    }
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const FormFieldCard = ({ icon, field, handleDelete }: FormFieldCardProps) => {
    
    const [open, setOpen] = useState<boolean>(false);

    const [options, setOptions] = useState<OptionProps[]>(field.type === "multiple-choice" ? field.props.choices : [])
    const [opinionScaleProps, setOpinionScaleProps] = useState<OpinionScaleProps>(field.type === 'opinion-scale' ? {...field.props} : {})
    const [rankingElements, setRankingElements] = useState<OptionProps[]>(field.type === "ranking" ? field.props.value : [])

    const [name, setName] = useState<string>(field.name!)
    const [header, setHeader] = useState<string>(field.header!)
    const [description, setDescription] = useState<string>(field.description!)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleAddOption = () => {
        const newOption: OptionProps = {
            id: alphabet[options?.length],
            content: ""
        }

        setOptions([...options, newOption])
    }

    const handleDeleteOption = (id: string) => {
        const newOptions: OptionProps[] = options;
                
        for (let i = 0; i < newOptions.length; i++) {
            if (newOptions[i].id === id) { 
                for (let j = i; j < newOptions.length - 1; j++) {
                    newOptions[j].content = newOptions[j+1].content
                }
                newOptions.pop()              
                break
            }
            
        }

        setOptions([...newOptions])
    }

    const handleOptionChange = (optionId: string, newValue: string) => {
        const newOptions: OptionProps[] = options;
                
        for (let i = 0; i < newOptions.length; i++) {
            if (newOptions[i].id === optionId) {                
                newOptions[i].content = newValue
                break
            }
        }

        setOptions([...newOptions])
    }

    const handleAddElement = () => {
        const newElement: OptionProps = {
            id: String(rankingElements?.length + 1),
            content: ""
        }

        setRankingElements([...rankingElements, newElement])
    }

    const handleDeleteElement = (id: string) => {
        const newOptions: OptionProps[] = rankingElements;
                
        for (let i = 0; i < newOptions.length; i++) {
            if (newOptions[i].id === id) { 
                for (let j = i; j < newOptions.length - 1; j++) {
                    newOptions[j].content = newOptions[j+1].content
                }
                newOptions.pop()              
                break
            }
            
        }

        setRankingElements([...newOptions])
    }

    const handleElementChange = (optionId: string, newValue: string) => {
        const newOptions: OptionProps[] = rankingElements;
                
        for (let i = 0; i < newOptions.length; i++) {
            if (newOptions[i].id === optionId) {                
                newOptions[i].content = newValue
                break
            }
        }

        setRankingElements([...newOptions])
    }

    return (
        <>
        <div onClick={handleOpen} className="w-full bg-white p-4 rounded-lg mb-2">
            <div className="text-lg font-semibold mb-2">{header}</div>
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
                    <input type="text"
                           id="name"
                           value={name} 
                           onChange={e => setName(e.target.value)}
                           className="w-full border border-black rounded-md p-2 focus:outline-none my-2" />
                </div>
                <div>
                    <label htmlFor="header">Field header</label>
                    <input type="text"
                           id="header"
                           value={header} 
                           onChange={e => setHeader(e.target.value)}
                           className="w-full border border-black rounded-md p-2 focus:outline-none my-2" />
                </div>
                <div>
                    <label htmlFor="description">Field description</label>
                    <TextareaAutosize id="description" 
                                      value={description}
                                      onChange={e => setDescription(e.target.value)} 
                                      className="w-full border border-black rounded-md p-2 focus:outline-none my-2" />
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
                                    <div key={option.id} className="w-full flex items-center justify-around mb-2">
                                        <div className="mr-2 text-lg font-semibold">{option.id}</div>
                                        <TextareaAutosize
                                               value={option.content} 
                                               className="text-lg focus:outline-none border-b border-black mr-2 resize-none"
                                               onChange={e => handleOptionChange(option.id, e.target.value)} />
                                        <X onClick={() => handleDeleteOption(option.id)} />
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
                    : field.type === "opinion-scale"
                    ? 
                        <div className="mb-4 flex flex-col gap-2 text-lg">
                            <div className="flex items-center gap-2">
                                <div>Min:</div>
                                <input type="number" 
                                       className="focus:outline-none border-b border-black w-5" 
                                       value={opinionScaleProps.min}
                                       onChange={e => setOpinionScaleProps({...opinionScaleProps, min: Number(e.target.value)})} />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>Max:</div>
                                <input type="number" 
                                       className="focus:outline-none border-b border-black w-5" 
                                       value={opinionScaleProps.max}
                                       onChange={e => setOpinionScaleProps({...opinionScaleProps, max: Number(e.target.value)})} />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>Start label:</div>
                                <input type="text" 
                                       className="focus:outline-none border-b border-black" 
                                       value={opinionScaleProps.labels.start}
                                       onChange={e => setOpinionScaleProps({...opinionScaleProps, labels: {start: e.target.value, end: opinionScaleProps.labels.end}})} />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>End label:</div>
                                <input type="text" 
                                       className="focus:outline-none border-b border-black" 
                                       value={opinionScaleProps.labels.end}
                                       onChange={e => setOpinionScaleProps({...opinionScaleProps, labels: {end: e.target.value, start: opinionScaleProps.labels.start}})} />
                            </div>
                        </div>
                    : field.type === "ranking"
                    ?
                        <>
                        <div className="text-lg mb-2 font-semibold">Elements</div>
                        {
                            rankingElements.map(option => {
                                return (
                                    <div key={option.id} className="w-full flex items-center justify-around mb-2">
                                        <div className="mr-2 text-lg font-semibold">{option.id}</div>
                                        <TextareaAutosize
                                               value={option.content} 
                                               onChange={e => handleElementChange(option.id, e.target.value)}
                                               className="text-lg focus:outline-none border-b border-black mr-2 resize-none"
                                                />
                                        <X onClick={() => handleDeleteElement(option.id)} />
                                    </div>
                                )
                            })
                        }
                        <div onClick={handleAddElement} className="text-blue-500 mb-4 underline">Add element</div>
                        </>
                    : <></>
                }
            </>
        </Modal>
        </>
    )
}