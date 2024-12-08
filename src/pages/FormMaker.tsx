/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { BuilderBottomMenu } from "../components/BuilderBottomMenu"
import { LongText } from "../components/LongText"
import { ShortText } from "../components/ShortText"
import { FormFieldCard } from "../components/FormFieldCard"
import { optionList } from "../utils/optionList"

interface FormField {
    id?: number;
    type?: string;
    name?: string;
    header?: string;
    description?: string;
    props?: any;
}

const fieldTemplates: FormField[] = [
    {
        id: 0,
        type: 'short-text',
        name: "name",
        header: "What's your name",
        description: "Just enter the name",
        props: {
          label: "",
          placeholder: "John Doe",
          onChange: () => {},
          value: "",
        }
      },
      {
        id: 0,
        type: "email",
        name: "email",
        header: "Write your email",
        description: "",
        props: {
          placeholder: "name@gmail.com",
          onChange: () => {},
          value: "",
        }
      },
      {
        id: 0,
        type: "phone",
        name: "phone",
        header: "Write your phone",
        description: "",
        props: {
          placeholder: "+7 (800) 555-35-35",
          onChange: () => {},
          value: "",
        }
      },
      {
        id: 0,
        type: "multiple-choice",
        name: "favouriteColor",
        header: "What is your favourite color",
        description: "Choose one",
        props: {
          multiSelect: false,
          className: "w-full",
          onChange: () => {},
          choices: [
            { id: "A", content: "red" },
            { id: "B", content: "green" },
            { id: "C", content: "blue" },
            { id: "D", content: "brown" },
          ],
          value: []
        }
      },
      {
        id: 0,
        type: 'long-text',
        name: "comment",
        header: "Write your thoughts about this app",
        description: "Any feedback is welcome",
        props: {
          label: "",
          placeholder: "So fucking shit",
          onChange: () => {},
          value: "",
        }
      },
      {
        id: 0,
        type: 'star-rating',
        name: "rating",
        header: "Rate our app",
        description: "Choose any number of stars you want",
        props: {
          onChange: () => {},
          value: 0,
          size: 32,
        }
      },
      {
        id: 0,
        type: 'opinion-scale',
        name: "opinion",
        header: "How likely will you use this app later",
        description: "",
        props: {
          onChange: () => {},
          min: 1,
          max: 10,
          labels: {
            start: 'Not likely at all',
            end: 'Extremely likely'
          }
        }
      },
      {
        id: 0,
        type: 'ranking',
        name: "ranking",
        header: "Rank the jobs that needs to be done",
        description: "",
        props: {
          onChange: () => {},
          value: [
            { id: '1', content: 'Learn React' },
            { id: '2', content: 'Build something awesome' },
            { id: '3', content: 'Share with the community' },
            { id: '4', content: 'Write documentation' },
            { id: '5', content: 'Deploy to production' },
          ]
        }
      },    
]

export const FormMaker = () => {

    const [formName, setFormName] = useState<string>("")
    const [formDescription, setFormDescription] = useState<string>("")
    const [formFields, setFormFields] = useState<FormField[]>([])
    
    const handleAddField = (fieldType: string) => {
        const newFieldTemplate = fieldTemplates.find(item => item.type === fieldType)

        const newField: FormField = {
            ...newFieldTemplate,
            id: formFields.length,
        }

        setFormFields([...formFields, newField])
    }

    const handleDelete = (fieldId: number) => {
        setFormFields(formFields.filter(field => field.id !== fieldId))
        
    }
    
    return (
        <>
            <ShortText 
                placeholder="My new form"
                label="Form name"
                value={formName}
                onChange={setFormName} />
            <div className="mb-5"></div>
            <LongText
                placeholder="Form description"
                label="Form description"
                value={formDescription}
                onChange={setFormDescription} />
            <div className="mb-5"></div>
            {
                formFields.map(field => {
                    const icon = optionList.find(item => item.type === field.type)
                    return (
                        <FormFieldCard handleDelete={handleDelete} icon={icon!} field={field} />
                    )
                })
            }
            <BuilderBottomMenu handleAddField={handleAddField} />
        </>
    )
}