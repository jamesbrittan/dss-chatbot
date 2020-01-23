import React, { useState, useEffect } from "react";
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
  const [name, setName] = useState("");
  const [inputVal, setInputVal] = useState("");

  // TODO - this initial state aray should be generated based on the initialQs
  const [questions, setQuestions] = useState([]);

  // This needs to be set outside of useState to use stateful values like ${name}
  // The keys here need to match with the "step" value for each question in useState
  // add "nextStep" logic to each of these blocks

  const initialQs = [
    {
      step: 0,
      text:
        "Hello 👋 I’m here to help – if you want to know more about a question at any point, just click the (?) icon. Can I start by asking your full name?",
      nextStep: answer => 1
    },
    {
      step: 1,
      text: `Hi ${name}, did a landlord or agent refuse to show or rent you a property because you’d need to claim housing benefit to pay for it?`,
      possibleAnswers: ["Yes", "No"],
      nextStep: answer => {
        switch (answer) {
          case "yes":
            return 2;
          case "no":
            return 3;
          default:
            return false;
        }
      }
    },
    {
      step: 2,
      text:
        "What is the name of this landord or agent? (this is not a real question but is an example of how questions can be skipped depending on the previous answer)",
      nextStep: () => 3
    },
    {
      step: 3,
      text:
        "And what date did this happen? If you don’t know the exact day, the month and year would help.",
      nextStep: () => 4
    },
    {
      step: 4,
      text: "Was this a letting agent or a landlord?",
      possibleAnswers: ["Yes", "No"],
      nextStep: () => 5
    },
    {
      step: 5,
      text:
        "Got it. And what reason did they give you? Or did they just not respond when you got in contact?",
      nextStep: () => 6
    },
    {
      step: 6,
      text:
        "Do you have any evidence of this? eg. A screenshot of an email or text, or a note of a phone call.",
      possibleAnswers: ["Yes", "No"],
      nextStep: () => 7
    },
    {
      step: 7,
      text: "And do you have a link to the advert of the property?",
      possibleAnswers: ["Yes", "No"],
      nextStep: () => 8
    },
    {
      step: 8,
      text:
        "Thanks. Have you had previous success renting property, paying your rent in full and on time?",
      possibleAnswers: ["Yes", "No"],
      nextStep: () => 9
    },
    { step: 9, text: "For how many years?", nextStep: answer => 10 },
    {
      step: 10,
      text:
        "Nearly there! Could you provide a good reference from a previous landlord?",
      possibleAnswers: ["Yes", "No"],
      nextStep: () => 11
    },
    {
      step: 11,
      text: "Great – that’s really useful evidence to help build your case.",
      nextStep: () => 12
    },
    {
      step: 12,
      text:
        "Do you have access to any savings and could you pay some rent in advance? Or do you have someone who could act as a financial guarantor?",
      possibleAnswers: ["Yes", "No"],
      nextStep: () => 13
    },
    {
      step: 13,
      text:
        "Three more questions! Do you have a rough idea of your total monthly income?",
      possibleAnswers: ["Yes", "No"],
      nextStep: () => 14
    },
    {
      step: 15,
      text: "Which of the following best applies to you?",
      possibleAnswers: ["Male", "Female", "Non-binary", "Other"],
      nextStep: () => 16
    },
    {
      step: 16,
      text:
        "Do you have a disability and/or suffer from long-term ill health? I’m asking you this because it may help the urgency of your case.",
      possibleAnsers: ["Yes", "No"],
      nextStep: () => 17
    },
    {
      step: 117,
      text:
        "That’s it! Now I’m going to give you a letter to send to the agent or landlord.",
      nextStep: () => 0
    }
  ];

  useEffect(() => {
    const initialQState = initialQs.map((q, i) => ({
      step: i,
      answer: null,
      show: i === 0 ? true : false,
      state: "unanswered"
    }));

    if (!questions.length) {
      setQuestions(initialQState);
    }
    console.log(questions);
  }, [initialQs, questions]);

  // useEffect(() => {
  //   console.log(questions);
  // });

  const handleChange = (e, step, answer, index, isNameInput) => {
    e.preventDefault();
    setName(answer);

    //The first thisQ below finds it based on index (this is more simple but will the indexes be consistent?)
    //The second thisQ finds it based on the "step" key

    // const thisQ = questions[index];
    const thisQ = questions.find(q => q.step === step);

    const nextQIndex = initialQs[index].nextStep(answer.toLowerCase());
    // See comment above thisQ const

    console.log(nextQIndex)

    const nextQ = questions[nextQIndex];
    // const nextQ = questions.find(q => q.step === nextQIndex);

    thisQ.answer = answer;
    thisQ.state = "answered";

    if (nextQ) nextQ.show = true;

    let newState = [];

    questions.forEach((question, index) => {
      if (question.step === thisQ.step) {
        newState[index] = thisQ;
      } else if (question.step === nextQ.step) {
        newState[index] = nextQ;
      } else {
        newState[index] = question;
      }
    });
    setQuestions(newState);
  };

  return (
    <Wrapper className="App">
      {questions &&
        questions.map(
          (i, index) =>
            i.show && (
              <>
                <Bubble question>{initialQs[i.step].text}</Bubble>

                {!i.answer ? (
                  <form
                    onSubmit={e =>
                      handleChange(e, i.step, inputVal, index, i.name)
                    }
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
