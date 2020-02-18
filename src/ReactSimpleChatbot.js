import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
// import nprogress from "nprogress";
// import "nprogress/nprogress.css";
import { hAvatar } from "./shelter_h.gif";

const ReactSimpleChatbot = () => {
  const [name, setName] = useState("");
  const [landlordOrAgent, setLandlordOrAgent] = useState("");
  const [refusalDate, setRefusalDate] = useState("");
  const [refusalReason, setRefusalReason] = useState("");
  // nprogress.configure({ trickle: false });
  // nprogress.set(0.0);

  // useEffect(() => {
  //   console.log({
  //     name,
  //     landlordOrAgent,
  //     refusalDate,
  //     refusalReason
  //   });
  // });

  // const updateProgress = (percent) => {
  //   nprogress.set(perc)
  // }

  const steps2 = [
    {
      // TODO - get timing of delays right
      id: "start0",
      message:
        "Do you feel you’ve been discriminated against by a letting agent or landlord, because you receive benefits?",
      trigger: () => {
        console.log("end of start0");
        console.log(this);
        return "start1";
      },
      delay: 1000
    },
    {
      id: "start1",
      message:
        "With just a few easy questions, we can create a personalised letter for you to send to them. Let them know what they’re doing wrong, and they might rethink their policies. You might even have grounds for a legal case against them, but we’ll get to that later.",
      trigger: "start3",
      delay: 4000
    },
    // {
    //   id: "start2",
    //   message:
    //     "Worried about privacy? Don’t be. You can change your contact preferences at any time by giving us a call on 0300 330 1234, or emailing info@shelter.org.uk. If you've already told us you want to receive updates, we'll keep contacting you in the same ways. And don't worry – although Shelter and Shelter Trading activities will use your details, we will never pass them on to third parties for marketing. Read our privacy policy [https://england.shelter.org.uk/contact_us/privacy] for more details.",
    //   trigger: "start3",
    //   delay: 2000
    // },
    {
      id: "start3",
      message: "Ready to join the fight against discrimination? 💪",
      trigger: "start4"
    },
    {
      id: "start4",
      options: [
        {
          value: true,
          label: "Yes, I'm ready",
          trigger: () => {
            // nprogress.set(0.5);
            return "askName";
          }
        },
        // TODO - what's the next step if "no" is selected?
        {
          value: false,
          label: "No, tell me more",
          trigger: () => {
            // nprogress.set(0.5);
            return "tellMeMore";
          }
        }
      ]
    },
    {
      id: "tellMeMore",
      message: "Here is some more information about this chatbot...",
      trigger: "tellMeMoreAcknowledge"
    },
    {
      id: "tellMeMoreAcknowledge",
      options: [
        {
          value: true,
          label: "Ok, let's get started",
          trigger: () => {
            // nprogress.set(0.1);
            return "askName";
          }
        }
      ]
    },
    {
      id: "askName",
      message:
        "Great! 😀 What’s your full name? We need this to say who the letter is from.",
      trigger: () => {
        // nprogress.set(0.15);
        return "setName";
      }
    },
    {
      id: "setName",
      user: true,
      validator: value => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askWereYouRefused",
      metadata: {
        capture: name
      }
    },
    {
      id: "askWereYouRefused",
      // TODO - Displaying full name here like "Hi James Brittan" is a possibly a bit weird.
      // We can split this to use just the first name "Hi James" but this assumes the name is in British/western format (or something like that)
      // Korean names would break this for example
      message:
        "Hi {previousValue}. Have you been refused the chance to rent a property because you receive benefits?",
      trigger: "setWereYouRefused"
    },
    {
      id: "setWereYouRefused",
      options: [
        { value: true, label: "Yes", trigger: "askWhichBenefits" },
        // TODO - what happens if the user selects "no"
        { value: false, label: "No", trigger: "askWhichBenefits" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askWhichBenefits",
      message: "Can you tell us what kind of benefits you receive?",
      trigger: "setWhichBenefits"
    },
    {
      id: "setWhichBenefits",
      options: [
        {
          value: "pip",
          label: "Personal Independence Payment (PIP)",
          trigger: "askHowDoYouIdentify"
        },
        {
          value: "housing benefit",
          label: "Housing benefit",
          trigger: "askHowDoYouIdentify"
        },
        {
          value: "employment allowance",
          label: "Employment Allowance",
          trigger: "askHowDoYouIdentify"
        },
        {
          value: "universal credit",
          label: "Universal Credit",
          trigger: "askHowDoYouIdentify"
        },
        {
          value: "other",
          label: "Other – please specify",
          trigger: "setWhichBenefitsFreeText"
        }
      ],
      metadata: {
        capture: "whichBenefits"
      }
    },
    {
      id: "setWhichBenefitsFreeText",
      user: true,
      validator: value => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askHowDoYouIdentify",
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askHowDoYouIdentify",
      message:
        "And can you tell us how you identify? We’re asking this so we can build a picture of who is affected by DSS discrimination.",
      trigger: "setHowDoYouIdentify"
    },
    {
      id: "setHowDoYouIdentify",
      // TODO - Should there be a "prefer not to say" option here?
      options: [
        { value: "male", label: "Male", trigger: "askDisability" },
        { value: "female", label: "Female", trigger: "askDisability" },
        { value: "non-binary", label: "Non-binary", trigger: "askDisability" },
        {
          value: "other",
          label: "Other – can I explain?",
          trigger: "setHowDoYouIdentifyFreeText"
        }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "setHowDoYouIdentifyFreeText",
      user: true,
      validator: value => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askDisability",
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askDisability",
      message: "And do you have a disability, and/or long-term ill health?",
      trigger: "setDisability"
    },
    {
      id: "setDisability",
      // TODO - Should this lead to a free text input for more information if "yes" is selected?
      options: [
        { value: true, label: "Yes", trigger: "askWrittenProof" },
        { value: false, label: "No", trigger: "askWrittenProof" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askWrittenProof",
      message:
        "Do you have written proof of an agent or landlord’s refusal to rent a property to you, because you receive benefits? 📝 For example, this could be a text message, email or letter.",
      trigger: "setWrittenProof"
    },
    {
      id: "setWrittenProof",
      // TODO - Do we need to capture this proof, or is knowing of its existence enough?
      // TODO - What happens if they answer "no"?
      options: [
        { value: true, label: "Yes", trigger: "askDate" },
        { value: false, label: "No", trigger: "askDate" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askDate",
      message:
        "And when did this happen? If you don’t know the exact day, the month and year would be helpful.",
      trigger: "setDate"
    },
    {
      // TODO - possible improvement: a datepicker would be useful here
      id: "setDate",
      user: true,
      validator: value => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askLettingAgentOrLandlord",
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askLettingAgentOrLandlord",
      message:
        "Was it a landlord or letting agent who refused to rent you the property?",
      trigger: "setLettingAgentOrLandlord"
    },
    {
      id: "setLettingAgentOrLandlord",
      options: [
        { value: "landlord", label: "Landlord", trigger: "askLinkToAd" },
        {
          value: "letting agent",
          label: "Letting agent",
          trigger: "askLinkToAd"
        }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askLinkToAd",
      message:
        "Got it 👌 Do you have a web link to the advert of the property? Don’t worry if not.",
      trigger: "setLinkToAd"
    },
    {
      id: "setLinkToAd",
      // TODO - Do we need the link itself?
      options: [
        { value: true, label: "Yes", trigger: "responseLinkToAd" },
        { value: false, label: "No", trigger: "responseLinkToAd" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      // TODO - this reads like the user has answered "no" to the previous question regardless of answer.
      id: "responseLinkToAd",
      message:
        "That’s ok. Now, we want to hear just a bit more about you, so we can personalise your letter.",
      delay: 1000,
      trigger: "askRentedSuccessfully"
    },
    {
      id: "askRentedSuccessfully",
      message:
        "Have you rented successfully before, paying your rent in full and on time? (We know this seems personal, but it’s completely confidential and helps us build a picture of your situation)",
      trigger: "setRentedSuccessfully"
    },
    {
      id: "setRentedSuccessfully",
      options: [
        { value: true, label: "Yes", trigger: "askHowManyYearsRentedSuccessfully" },
        { value: false, label: "No", trigger: "askHowManyYearsRentedSuccessfully" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askHowManyYearsRentedSuccessfully",
      // TODO - this reads like the user has answered "yes" to the previous question
      message:
        "Brilliant! ✅ And for how many years? This might seem nosey, but we’re trying to build your case as a great tenant.",
      trigger: "setHowManyYearsRentedSuccessfully"
    },
    {
      // TODO - select list would be better than free text here
      id: "setHowManyYearsRentedSuccessfully",
      user: true,
      validator: value => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askCanYouGetLandlordReference",
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askCanYouGetLandlordReference",
      message:
        "Ok – nearly finished. Could you get a good reference from your last landlord?",
      trigger: "setCanYouGetLandlordReference"
    },
    {
      id: "setCanYouGetLandlordReference",
      options: [
        { value: true, label: "Yes", trigger: "askDoYouHaveSavings" },
        { value: false, label: "No", trigger: "askDoYouHaveSavings" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "askDoYouHaveSavings",
      message:
        "Do you have access to savings, and could you pay some rent in advance? Or do you have someone who could be your guarantor? A guarantor is someone who can pay your rent if you end up unable to.",
      trigger: "setDoYouHaveSavings"
    },
    {
      id: "setDoYouHaveSavings",
      options: [
        {
          value: { savings: "yes", rent: "no", guarantor: null },
          label: "I have savings but could not pay rent in advance",
          trigger: "askDoYouHaveSavings"
        },
        {
          value: { savings: "yes", rent: "some", guarantor: null },
          label: "I have savings and could pay some rent in advance",
          trigger: "askDoYouHaveSavings"
        },
        {
          value: { savings: null, rent: null, guarantor: "yes" },
          label: "I have someone who could be a guarantor",
          trigger: "askDoYouHaveSavings"
        },
        {
          value: { savings: "no", rent: "no", guarantor: "no" },
          label: "I don’t have any of these",
          trigger: "askDoYouHaveSavings"
        },
        {
          value: { savings: "unsure", rent: "unsure", guarantor: "unsure" },
          label: "I’m not sure",
          trigger: "askDoYouHaveSavings"
        }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "responseCanYouGetLandlordReference",
      message:
        "Thanks for sticking with us so far! 👍 Only three more questions to go...",
      delay: 1000,
      trigger: "askMonthlyIncome"
    },
    {
      id: "askMonthlyIncome",
      message:
        "Do you know roughly what your monthly income is? Please enter the amount below.",
      trigger: "setMonthlyIncome"
    },
    {
      id: "setMonthlyIncome",
      user: true,
      validator: value => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "end1",
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "end1",
      message: "OK then – we’re all done! 🎉",
      trigger: "end2"
    },
    {
      id: "end2",
      message:
        "We think this is great evidence and hope it will encourage your landlord or agent to change their policies. You may also have a good case for indirect discrimination.",
      trigger: "end3"
    },
    {
      id: "end3",
      message:
        "Sadly we can’t guarantee that they will change their policies, or that you would be successful in claiming for discrimination. But we would still encourage you to send your personalised letter to the agent or landlord. Increasing awareness of discrimination against people receiving benefits might mean you have an easier time renting in the future, and help landlords make sure they’re acting lawfully.",
      trigger: "end4"
    },
    {
      id: "end4",
      message:
        "You’re not only standing up for yourself, but for others in similar situations – and together, we’re more likely to make change happen.",
      trigger: "end5"
    },
    {
      // TODO - this feels redundant
      id: "askReadyForLetter",
      message: "Ready to get your personalised letter? ➡️",
      trigger: "setCanYouGetLandlordReference"
    },
    {
      id: "setCanYouGetLandlordReference",
      options: [
        { value: true, label: "Yes", trigger: "end6" },
        { value: false, label: "No", trigger: "end6" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      id: "end5",
      // TODO - add link
      message:
        "Great! Here you go. Just click on the link to download your letter.",
      trigger: "end6"
    },
    {
      id: "end6",
      message:
        "By sending this letter, you’re helping us fight against ‘no DSS’ discrimination. This could improve the future of renters like you and others, who simply want a place to call home. We can’t do this without your help, so thank you for getting involved.",
      trigger: "askMoreHelp"
    },
    {
      id: "askMoreHelp",
      message:
        "Do you want more help, or to know more about our No DSS campaign?",
      trigger: "setMoreHelp"
    },
    {
      id: "setMoreHelp",
      // TODO - what happens if the user select "yes"?
      options: [
        { value: true, label: "Yes", trigger: "end7" },
        { value: false, label: "No", trigger: "end7" }
      ],
      metadata: {
        capture: "wereYouRefused"
      }
    },
    {
      // TODO - needs completion message
      id: "end7",
      message: "Thank you, more information can be found at https://england.shelter.org.uk/support_us/campaigns/dss",
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

  const handleEnd = ({ steps }) => {
    console.log(steps);
    // nprogress.done();
  };
  return (
    <ChatBot
      headerTitle="Pocket Lawyer"
      botAvatar="https://res.cloudinary.com/dk5jxmsza/image/upload/v1580921453/shelter_h.gif"
      steps={steps2}
      handleEnd={handleEnd}
    />
  );
};

export default ReactSimpleChatbot;
