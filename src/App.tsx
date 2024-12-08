import { FormMaker } from "./pages/FormMaker"
// import { FormRenderer } from "./pages/FormRenderer"


// const fields = [
//   {
//     id: 0,
//     type: 'short-text',
//     name: "name",
//     header: "What's your name",
//     description: "Just enter the name",
//     props: {
//       label: "",
//       placeholder: "John Doe",
//       onChange: () => {},
//       value: "",
//     }
//   },
//   {
//     id: 1,
//     type: "email",
//     name: "email",
//     header: "Write your email",
//     description: "",
//     props: {
//       placeholder: "name@gmail.com",
//       onChange: () => {},
//       value: "",
//     }
//   },
//   {
//     id: 2,
//     type: "phone",
//     name: "phone",
//     header: "Write your phone",
//     description: "",
//     props: {
//       placeholder: "+7 (800) 555-35-35",
//       onChange: () => {},
//       value: "",
//     }
//   },
//   {
//     id: 3,
//     type: "multiple-choice",
//     name: "favouriteColor",
//     header: "What is your favourite color",
//     description: "Choose one",
//     props: {
//       multiSelect: false,
//       className: "w-full",
//       onChange: () => {},
//       choices: [
//         { id: "A", content: "red" },
//         { id: "B", content: "green" },
//         { id: "C", content: "blue" },
//         { id: "D", content: "brown" },
//       ],
//       value: []
//     }
//   },
//   {
//     id: 4,
//     type: 'long-text',
//     name: "comment",
//     header: "Write your thoughts about this app",
//     description: "Any feedback is welcome",
//     props: {
//       label: "",
//       placeholder: "So fucking shit",
//       onChange: () => {},
//       value: "",
//     }
//   },
//   {
//     id: 5,
//     type: 'star-rating',
//     name: "rating",
//     header: "Rate our app",
//     description: "Choose any number of stars you want",
//     props: {
//       onChange: () => {},
//       value: 0,
//       size: 32,
//     }
//   },
//   {
//     id: 6,
//     type: 'opinion-scale',
//     name: "opinion",
//     header: "How likely will you use this app later",
//     description: "",
//     props: {
//       onChange: () => {},
//       min: 1,
//       max: 10,
//       labels: {
//         start: 'Not likely at all',
//         end: 'Extremely likely'
//       }
//     }
//   },
//   {
//     id: 7,
//     type: 'ranking',
//     name: "ranking",
//     header: "Rank the jobs that needs to be done",
//     description: "",
//     props: {
//       onChange: () => {},
//       value: [
//         { id: '1', content: 'Learn React' },
//         { id: '2', content: 'Build something awesome' },
//         { id: '3', content: 'Share with the community' },
//         { id: '4', content: 'Write documentation' },
//         { id: '5', content: 'Deploy to production' },
//       ]
//     }
//   },
// ]

function App() {

  return (
    <main className="h-screen w-screen p-10 mb-40 flex flex-col justify-center items-center">
      {/* <FormRenderer fields={fields} /> */}
      <FormMaker />
    </main>
  )

}

export default App
