import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const Input = ({ type, onChange }) => <input type={type} onChange={onChange} />;

function App() {
  const [name, setName] = useState("tom");
  const [inputVal, setInputVal] = useState("");
  const [questions, setQuestions] = useState([
    // {
    //   id: "intro",
    //   text: "Hello :wave: I’m here to help – if you want to know more about a question at any point, just click the (?) icon",
    //   noAnswerRequired: true,
    //   wait: "0.5",
    // },
    {
      step: 0,
      text: "Can I start by asking your full name?",
      answer: null,
      show: true,
      state: "unanswered"
    },
    {
      step: 1,
      text: `Hi ${name}, did a landlord or agent refuse to show or rent you a property because you’d need to claim housing benefit to pay for it?`,
      answer: null,
      show: false
    },
    {
      step: 2,
      text:
        "And what date did this happen? If you don’t know the exact day, the month and year would help.",
      answer: null,
      show: false
    }
  ]);

  console.log(questions);

  const handleChange = (e, step, answer, index) => {
    e.preventDefault();
    // const thisQ = questions.find(el => el.step === step);
    const thisQ = questions[index];
    // const nextQ = questions.find(el => el.step === step + 1);
    const nextQ = questions[index + 1];

    thisQ.answer = answer;
    thisQ.state = "answered";
    // thisQ.show = false;

    if (nextQ) nextQ.show = true;
    // setQuestions(prevState => prevState + 1)

    // const test = []
    const newState = [...questions];

    newState[index] = thisQ;
    if (nextQ) {
      newState[index + 1] = nextQ;
    }

    setQuestions(newState);
    console.log(questions);
    // setQuestions(...questions, qToUpdate);
    // console.log(qToUpdate);
  };

  // const createQuestions = () => {
  //   // for (const question of questions) {
  //   //   return question.text;
  //   // }

  //   return questions.map(i => i.show === true && i.text);
  // };

  return (
    <div className="App">
      {questions &&
        questions.map(
          (i, index) =>
            i.show && (
              <>
                <p>{i.text}</p>

                {!i.answer ? (
                  <form
                    onSubmit={e => handleChange(e, i.step, inputVal, index)}
                  >
                    <Input
                      id={i.id}
                      onChange={e => setInputVal(e.target.value)}
                    />
                    <input type="submit" value="Submit" />
                  </form>
                ) : i.answer}
              </>
            )
        )}
    </div>
  );
}

export default App;
