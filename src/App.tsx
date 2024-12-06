/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { BottomMenu } from "./components/BottomMenu"
import { Description } from "./components/Description"
import { Header } from "./components/Header"
import MultipleChoice from "./components/MultipleChoice"
import { ShortText } from "./components/ShortText"
import { LongText } from "./components/LongText"
import { Phone } from "./components/Phone"
import { Email } from "./components/Email"
import { SortableList } from "./components/SortableList"
import { OpinionScale } from "./components/OpinionScale"
import { StarRating } from "./components/StarRating"

// interface Item {
//   id: string;
//   content: string;
// }

// const initialItems: Item[] = [
//   { id: '1', content: 'Learn React' },
//   { id: '2', content: 'Build something awesome' },
//   { id: '3', content: 'Share with the community' },
//   { id: '4', content: 'Write documentation' },
//   { id: '5', content: 'Deploy to production' },
// ];

// const initialChoices: Item[] = [
//   { id: "A", content: "red" },
//   { id: "B", content: "green" },
//   { id: "C", content: "blue" },
//   { id: "D", content: "brown" },
// ]

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

function App() {

  const [curField, setCurField] = useState<number>(-1)
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
    setCurField(curField+1)
  }

  const handlePrev = () => {
    if (curField === -1) return;
    setTransitionDirection('prev')
    setCurField(curField-1)
  }

  const createForm = () => {

    const fields: FormField[] = [
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
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
    <main className="h-screen w-screen p-10 mb-40 flex flex-col justify-center items-center">
      <TransitionGroup className="w-full flex justify-center">
        {renderFormField()}
      </TransitionGroup>
        {/* <SortableList items={items} onReorder={setItems} /> */}
      <BottomMenu buttonText={"OK"} next={handleNext} prev={handlePrev} />
    </main>
  )
}

export default App
