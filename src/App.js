import React, { useState } from "react";
import styled from "styled-components";

const Input = ({ type, onChange }) => (
  <input type={type} onChange={onChange} className="text-input" />
);

const Bubble = styled.div`
  background: ${props => (props.question ? "#f1f0f0" : "#e4303d")};
  border-radius: 5px;
  padding: 1em;
  max-width: 400px;
  align-self: ${props => (props.question ? "flex-start" : "flex-end")};
  color: ${props => (props.question ? "black" : "white")};
`;

const Wrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const TextInput = styled.div`
  width: 100%;
  clear: both;
  display: flex;
  margin-top: 0.5em;
  justify-content: space-between;

  .text-input {
    width: 75%;
    padding: 0.5em;
    border: 2px solid #f1f0f0;
    border-radius: 10px;
  }
`;

const Submit = styled.input`
  width: 20%;
  background: white;
  border: 2px solid #12b9bf;
  border-radius: 10px;
`;

// TODO - allow for "questions" which don't require an answer and automatically move onto a new question after a second or so
// TODO - add animations or interval after question submission
// TODO - allow for name (and potentially other requested values) to be used within questions

function App() {
  const [name, setName] = useState("gdfg");
  const [inputVal, setInputVal] = useState("");
  const [questions, setQuestions] = useState([

    {
      step: 0,
      text: "Hello 👋 I’m here to help – if you want to know more about a question at any point, just click the (?) icon. Can I start by asking your full name?",
      answer: null,
      show: true,
      state: "unanswered",
      name: true
    },
    {
      step: 1,
      text: `Hi ${name}, did a landlord or agent refuse to show or rent you a property because you’d need to claim housing benefit to pay for it?`,
      answer: null,
      show: false,
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

  const handleChange = (e, step, answer, index, isNameInput) => {
    e.preventDefault();
    setName(answer)

    const thisQ = questions[index];
    const nextQ = questions[index + 1];

    thisQ.answer = answer;
    thisQ.state = "answered";

    if (nextQ) nextQ.show = true;

    const newState = [...questions];

    newState[index] = thisQ;
    if (nextQ) {
      newState[index + 1] = nextQ;
    }
    setQuestions(newState);
    console.log(questions);

  };

  return (
    <Wrapper className="App">
      {questions &&
        questions.map(
          (i, index) =>
            i.show && (
              <>
                <Bubble question>
                  {i.text}
                </Bubble>

                {!i.answer ? (
                  <form
                    onSubmit={e => handleChange(e, i.step, inputVal, index, i.name)}
                  >
                    <TextInput>
                      <Input
                        id={i.id}
                        onChange={e => setInputVal(e.target.value)}
                      />
                      <Submit type="submit" value="Send" className="button" />
                    </TextInput>
                  </form>
                ) : (
                  <Bubble answer>{i.answer}</Bubble>
                )}
              </>
            )
        )}
    </Wrapper>
  );
}

export default App;
