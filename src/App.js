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
  const [name, setName] = useState("");
  const [inputVal, setInputVal] = useState("");

  // TODO, maybe move questions out of state and just use this for answers/progress (move determineNext step)
  const [questions, setQuestions] = useState([
    {
      step: 0,
      answer: null,
      show: true,
      state: "unanswered",
      name: true,
      // determineNextStep: () => 1
      determineNextStep: input => {
        // Error handling probably doesn't belong here
        if (typeof input !== "string" || input.length === 0) {
          console.log("invalid input"); // TODO - proper error handling
        } else {
          switch (input.toLowerCase()) {
            case "james":
              return 1;
            case "tom":
              return 2;

            // no default
          }
        }
      }
    },
    {
      step: 1,
      answer: null,
      show: false
    },
    {
      step: 2,
      answer: null,
      show: false
    },
    {
      step: 3,
      answer: null,
      show: false
    }
  ]);

  // const qText = {
  //   0:
  // }

  // This needs to be set outside of useState to use stateful values like ${name}
  // Non stateful related values like determineNextStep might also belong here
  // The keys here need to match with the "step" value for each question in useState
  const qText = {
    0: "Hello 👋 I’m here to help – if you want to know more about a question at any point, just click the (?) icon. Can I start by asking your full name?",
    1: `Hi ${name}, did a landlord or agent refuse to show or rent you a property because you’d need to claim housing benefit to pay for it?`,
    2: "And what date did this happen? If you don’t know the exact day, the month and year would help.",
    3: "Was this a letting agent or a landlord?",
    4: "Got it. And what reason did they give you? Or did they just not respond when you got in contact?",
    5: "Do you have any evidence of this? eg. A screenshot of an email or text, or a note of a phone call.",
    6: "And do you have a link to the advert of the property?",
    7: "Thanks. Have you had previous success renting property, paying your rent in full and on time?",
    8: "For how many years?",
    9: "Nearly there! Could you provide a good reference from a previous landlord?",
    10: "Great – that’s really useful evidence to help build your case.",
    11: "Do you have access to any savings and could you pay some rent in advance? Or do you have someone who could act as a financial guarantor?",
    12: "Three more questions! Do you have a rough idea of your total monthly income?",
    13: "Which of the following best applies to you?",
    14: "Do you have a disability and/or suffer from long-term ill health? I’m asking you this because it may help the urgency of your case.",
    15: "That’s it! Now I’m going to give you a letter to send to the agent or landlord."
  };

  const handleChange = (e, step, answer, index, isNameInput) => {
    e.preventDefault();
    setName(answer);

    const thisQ = questions[index];
    const nextQ =
      questions[thisQ.determineNextStep(answer)] || questions[index + 1];

    // const thisQ = questions.find(q => q.step === step);
    // const nextQ = questions.find(
    //   q => q.step === thisQ.determineNextStep(answer)
    // );

    console.log(nextQ);

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

    console.log(newState);

    // const newState = [...questions];

    // newState[index] = thisQ;
    // if (nextQ) {
    //   newState[index + 1] = nextQ;
    // }
    setQuestions(newState);
    // console.log(questions);
  };

  return (
    <Wrapper className="App">
      {questions &&
        questions.map(
          (i, index) =>
            i.show && (
              <>
                <Bubble question>{qText[i.step]}</Bubble>

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
