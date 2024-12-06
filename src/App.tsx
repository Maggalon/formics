import { useState } from "react"

import { BottomMenu } from "./components/BottomMenu"
import { Description } from "./components/Description"
import { Header } from "./components/Header"
import MultipleChoice from "./components/MultipleChoice"

interface Item {
  id: string;
  content: string;
}

// const initialItems: Item[] = [
//   { id: '1', content: 'Learn React' },
//   { id: '2', content: 'Build something awesome' },
//   { id: '3', content: 'Share with the community' },
//   { id: '4', content: 'Write documentation' },
//   { id: '5', content: 'Deploy to production' },
// ];

const initialChoices: Item[] = [
  { id: "A", content: "fat, small man" },
  { id: "B", content: "small, man fat" },
  { id: "C", content: "man, fat small" },
  { id: "D", content: "small, fat man" },
]


function App() {

  // const [items, setItems] = useState<Item[]>(initialItems);
  const [, setSelectedChoices] = useState<string[]>();
  // const [score, setScore] = useState<number | undefined>();
  // const [rating, setRating] = useState(3);
  
  return (
    <main className="h-screen w-screen p-10 flex flex-col justify-center items-center">
      <div className="w-full max-w-lg">
        <Header content={"What's your name"} />
        <Description content={"Be honest :)"} />
        <MultipleChoice
          choices={initialChoices}
          multiSelect={true}
          onChange={setSelectedChoices}
          className="w-full"
        />
        {/* <StarRating 
          value={rating} 
          onChange={setRating}
          size={32}
        /> */}
        {/* <OpinionScale
          min={1}
          max={10}
          defaultValue={score}
          onChange={setScore}
          labels={{
            start: 'Not likely at all',
            end: 'Extremely likely'
          }}
        /> */}
        {/* <SortableList items={items} onReorder={setItems} /> */}
        {/* <Phone placeholder={"+7 (800) 555-35-35"} /> */}
        {/* <Email placeholder={"name@gmail.com"} /> */}
        {/* <LongText placeholder={"John Doe"} label={"Name"} /> */}
        {/* <ShortText label={""} placeholder={"John Doe"} /> */}
      </div>
      <BottomMenu buttonText={"Submit"} />
    </main>
  )
}

export default App
