/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { BottomMenu } from "../components/FormBottomMenu"
import { Description } from "../components/Description"
import { Header } from "../components/Header"
import MultipleChoice from "../components/MultipleChoice"
import { ShortText } from "../components/ShortText"
import { LongText } from "../components/LongText"
import { Phone } from "../components/Phone"
import { Email } from "../components/Email"
import { SortableList } from "../components/SortableList"
import { OpinionScale } from "../components/OpinionScale"
import { StarRating } from "../components/StarRating"

interface FormField {
  id: number;
  type: string;
  name: string;
  header: string;
  description: string;
  props: any;
}

interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
}

interface FormRendererProps {
    fields: FormField[];
}

const FIELD_COMPONENTS: Record<string, React.FC<any>> = {
  'short-text': ShortText,
  'long-text': LongText,
  'phone': Phone,
  'email': Email,
  'ranking': SortableList,
  'opinion-scale': OpinionScale,
  'star-rating': StarRating,
  'multiple-choice': MultipleChoice,
}

export const FormRenderer = ({ fields }: FormRendererProps) => {

    const [curField, setCurField] = useState<number>(-1)
    const [progress, setProgress] = useState<string>("0%")
    const [testForm, setTestForm] = useState<Form>()
    const [testFormResponses, setTestFormResponses] = useState<{ [fieldName: string]: any }>({})
    const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next')
  
    const handleResponseChange = (fieldName: string, value: any) => {
      setTestFormResponses(prev => ({
        ...prev,
        [fieldName]: value
      }))
    }
  
    const renderFormField = () => {
  
      if (curField === -1) {
        return (
          <CSSTransition
            key="intro"
            classNames={{
              enter: 'transition-enter',
              enterActive: 'transition-enter-active',
              exit: 'transition-exit',
              exitActive: 'transition-exit-active'
            }}
            timeout={300}
          >
            <div className="w-full max-w-lg">
              <h2 className="text-3xl font-normal text-gray-800 mb-2">{testForm?.title}</h2>
              <p className="text-xl font-normal text-gray-600 mb-10">{testForm?.description}</p>
            </div>
          </CSSTransition>
        )
      }
  
      const field = testForm?.fields.find(item => item.id === curField)
  
      const FieldComponent = FIELD_COMPONENTS[field!.type]
  
      if (!FieldComponent) {
        return <div>Unsupported field type</div>
      }
  
      const props = testFormResponses[field!.name] 
        ? {
            ...field!.props,
            onChange: (value: any) => handleResponseChange(field!.name, value),
            value: testFormResponses[field!.name]
          }
        : {
            ...field!.props,
            onChange: (value: any) => handleResponseChange(field!.name, value),
          }
  
      return (
        <CSSTransition
          key={`field-${field!.id}`}
          classNames={{
            enter: `transition-${transitionDirection}-enter`,
            enterActive: `transition-${transitionDirection}-enter-active`,
            exit: `transition-${transitionDirection}-exit`,
            exitActive: `transition-${transitionDirection}-exit-active`
          }}
          timeout={300}
        >
          <div className="w-full max-w-lg">
            <Header content={field!.header} />
            <Description content={field!.description} />
            <FieldComponent {...props} />
          </div>
        </CSSTransition>
      )
    }
  
    const handleNext = () => {
  
      if (curField === testForm?.fields.at(-1)?.id) {
        console.log(testFormResponses);
        setTransitionDirection('next')
        //setTestFormResponses({})
        return;
      }
      setProgress(`${(100 / testForm!.fields.length) * (curField+2)}%`)
      setCurField(curField+1)
    }
  
    const handlePrev = () => {
      if (curField === -1) return;
      setTransitionDirection('prev')
      setProgress(`${(100 / testForm!.fields.length) * (curField)}%`)
      setCurField(curField-1)
    }
  
    const createForm = () => {
  
      const newForm: Form = {
        id: uuidv4(),
        title: "Test Form",
        description: "Just a simple form to test functionality",
        fields: fields,
      }
  
      setTestForm(newForm)
    }
  
    useEffect(() => {
      createForm()
    }, [])
    
    return (
      <>
        <div className="w-full bg-gray-200 h-1.5 fixed top-0 left-0 z-50">
          <div className="bg-[#0083B0] h-1.5" style={{width: progress}}></div>
        </div>
        <TransitionGroup className="w-full flex justify-center">
          {renderFormField()}
        </TransitionGroup>
          {/* <SortableList items={items} onReorder={setItems} /> */}
        <BottomMenu buttonText={"OK"} next={handleNext} prev={handlePrev} />
      </>
    )
  }