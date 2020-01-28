import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";

const ReactSimpleChatbot = () => {
  const [name, setName] = useState("");
  const [landlordOrAgent, setLandlordOrAgent] = useState("");
  const [refusalDate, setRefusalDate] = useState("");
  const [refusalReason, setRefusalReason] = useState("");

  useEffect(() => {
    console.log({
      name,
      landlordOrAgent,
      refusalDate,
      refusalReason
    });
  });

  const steps = [
    {
      id: "start",
      message:
        "Hello :wave: I’m here to help – if you want to know more about a question at any point, just click the (?) icon.",
      trigger: "askName"
    },
    {
      id: "askName",
      message: "Can I start by asking your full name?",
      trigger: "setName"
    },
    {
      id: "setName",
      user: true,
      validator: value => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        setName(value);
        return true;
      },
      trigger: "askWereYouRefused"
    },
    {
      id: "askWereYouRefused",
      message:
        "Hi {previousValue}, did a landlord or agent refuse to show or rent you a property because you’d need to claim housing benefit to pay for it?",
      trigger: "setWereYouRefused"
    },
    {
      id: "setWereYouRefused",
      options: [
        { value: true, label: "Yes", trigger: "askRefusalDate" },
        { value: false, label: "No", trigger: "end" }
      ],
      // validator: value => {
      //   if (typeof value !== "string") {
      //     return "value should be a string";
      //   }
      //   setName(value);
      //   return true;
      // }
      // trigger: "end"
    },
    {
      id: "askRefusalDate",
      message:
        "And what date did this happen? If you don’t know the exact day, the month and year would help.",
      trigger: "setRefusalDate"
    },
    // TODO - create custom datepicker component here
    {
      id: "setRefusalDate",
      user: true,
      validator: value => {
        if (value) {
          setRefusalDate(value);
          return true;
        }
      },
      trigger: "askLandlordOrAgent"
    },
    {
      id: "askLandlordOrAgent",
      message: "Was this a letting agent or a landlord?",
      // options: [
      //   {
      //     value: "letting agent",
      //     label: "Letting agent",
      //     trigger: "askRefusalReason"
      //   },
      //   { value: "landlord", label: "Landlord", trigger: "askRefusalReason" }
      // ],

      trigger: "setLandlordOrAgent"
    },
    {
      id: "setLandlordOrAgent",
      options: [
        {
          value: "letting agent",
          label: "Letting agent",
          trigger: "askRefusalReason"
        },
        { value: "landlord", label: "Landlord", trigger: "askRefusalReason" }
      ],
      validator: value => {
        // if (typeof value !== "string") {
        //   return "value should be a string";
        // }
        setLandlordOrAgent(value);
        return true;
      }
      // trigger: "end"
    },
    {
      id: "askRefusalReason",
      message:
        "Got it. And what reason did they give you? Or did they just not respond when you got in contact?",
      trigger: "setRefusalReason"
    },
    {
      id: "setRefusalReason",
      user: true,
      validator: value => {
        if (value) {
          setRefusalReason(value);
          return true;
        }
      },
      trigger: "end"
    },

    {
      id: "end",
      message: "this is the end",
      end: true
    }
    // {
    //   id: "setLandlordOrAgent",
    //   validator: value => {
    //     console.log(value);
    //     if (typeof value !== "boolean") {
    //       return "value should be a boolean";
    //     }
    //     // setLandlordOrAgent(value);
    //     return true;
    //   }
    // }

    // {
    //   id: "3",
    //   user: true,
    //   validator: value => {
    //     if (isNaN(value)) {
    //       return "value should be a number";
    //     }
    //     return true;
    //   },
    //   trigger: "4"
    // }
  ];

  const handleEnd = ({ steps, values }) => {
    // console.log(steps);
    console.log(values);
    alert(`Chat handleEnd callback! Number: ${values[0]}`);
  };
  return <ChatBot steps={steps} handleEnd={handleEnd} />;
};

export default ReactSimpleChatbot;
