import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
// import nprogress from "nprogress";
// import "nprogress/nprogress.css";
import { hAvatar } from "./shelter_h.gif";

const ReactSimpleChatbot = () => {
  const [name, setName] = useState("XX");
  const [email, setEmail] = useState("test@example.com"); // TODO - the script doesn't ask for an email address
  const [gender, setGender] = useState("XX");
  const [income, setIncome] = useState("XX");
  const [canPayRentInAdvance, setCanPayRentInAdvance] = useState(false);
  const [hasGuarantor, setHasGuarantor] = useState(false);
  const [hasSavings, setHasSavings] = useState(false); // TODO - this info isn't used in the letter, is it required?
  const [yearsInCurrentHome, setYearsInCurrentHome] = useState();
  const [yearsInPreviousProperties, setYearsInPreviousProperties] = useState(0);
  const [hasSpecificEvidence, setHasSpecificEvidence] = useState(false);
  const [dateOfDiscrimination, setDateofDiscrimination] = useState(
    "March 2020"
  );
  const [wherePropertyWasAdvertised, setWherePropertyWasAdvertised] = useState(
    "OpenRent"
  );
  const [linkToAd, setLinkToAd] = useState("https://www.openrent.com");
  const [isDisabled, setIsDisabled] = useState(false);
  // const [landlordOrAgent, setLandlordOrAgent] = useState("");
  // const [refusalDate, setRefusalDate] = useState("");
  // const [refusalReason, setRefusalReason] = useState("");

  const [finished, setFinished] = useState(true);
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

  // TODO - Should "I can pay a deposit" be conditional?
  // TODO - What should happen when "I have lived in my current home for just over x years" is less than 1?
  const letterText = () => (
    <div>
      <p className="align-left">
        {email}
        <br />
        March 2nd 2019
      </p>

      <p>
        To: Complaints and legal department, residential lettings <br />
        Dear Sir/Madam,
        <br />
        <strong>FORMAL COMPLAINT</strong>
      </p>
      <p>
        My name is {name}. I am a {gender} and I am in receipt of benefits.
        {isDisabled && " I am also disabled."} My total income is about £
        {income} per month. I can pay a deposit{" "}
        {canPayRentInAdvance && "and am able to pay rent in advance"}.{" "}
        {hasGuarantor &&
          "I also have a fulltime employed/home owning guarantor."}
      </p>
      <p>
        I have lived in my current home for just over {yearsInCurrentHome}{" "}
        years, paying the rent in full and on time.{" "}
        {yearsInPreviousProperties > 0 &&
          `I have a good rental history
        in other properties, covering the last ${yearsInPreviousProperties} years.`}{" "}
        I am currently searching for a new home.
      </p>

      <p>
        {hasSpecificEvidence ? (
          <div>
            On {dateOfDiscrimination} I saw your advert for a property on{" "}
            {wherePropertyWasAdvertised} that would be both appropriate and
            affordable for me. Here is a{" "}
            <a href={linkToAd}>link to the advert</a>.
          </div>
        ) : (
          <div>
            I have seen adverts of yours which state ‘No DSS’ spoken to one of
            your agents, who said the home I wanted didn’t accept people who
            receive benefits
          </div>
        )}
      </p>
      <p>
        <strong>The law</strong>
        <br />
        Section 19 of the Equality Act 2010 prohibits ‘indirect discrimination’.
        Indirect discrimination occurs where a policy, practice or procedure
        which is not discriminatory in itself is likely to impact
        disproportionately on people with a ‘protected characteristic’ – such as
        women or people with a disability. A practice, policy or procedure can
        be formal or informal. It can be a one-off decision or a decision to do
        something in the future. It includes things like arrangements, criteria,
        conditions, qualifications or provisions.
      </p>
      <p>
        Shelter’s analysis of official figures show that women are more likely
        to be benefit claimants than men and that that those with disabilities
        are more likely to be in receipt of benefits than those without
        disabilities. This means that a practice or criteria of excluding
        tenants in receipt of benefits is likely to impact more negatively upon
        women than men and more negatively upon those with disabilities than
        those without. If there is no good reason for this practice, this
        practice would amount to unlawful indirect discrimination against women
        and people with disabilities.
      </p>
      <p>
        If landlord/agent cited mortgage:The Shelter/You Gov, 2017 Private
        Renters Survey revealed that a substantial proportion of landlords (45%)
        had no outstanding mortgages on any of the homes they let out. For those
        who do have mortgages, Shelter research shows that most buy-to-let
        mortgages do not have any restrictions upon landlords letting to those
        in receipt of benefits. According to UK Finance, 80% of the market
        (according to market share) allow landlords to let to people in receipt
        of benefits.
      </p>

      <p>
        If landlord/agent cited insurance: Landlord insurance to cover
        letting to benefit claimants (including rent guarantee insurance) is
        readily available at an affordable rate. Having a restrictive insurance
        policy is therefore not an objective justification for the practice of
        refusing to consider letting to any/all potential tenants in receipt of
        benefits. An alternative, more proportionate means for the landlord to
        achieve their legitimate aim of finding a suitable tenant and running a
        profitable business would be to consider all potential tenants on a
        case-by-case basis. If the tenant selected happens to receive benefits,
        the landlord should apply to have their existing insurance policy
        amended to cover this or buy an alternative policy to include this
        cover.
      </p>

      <p>
        <strong>What I am asking you to do</strong>
      </p>
      <p>
        Applying a blanket ban on any / all applications from prospective
        tenants who receive benefits may make you liable for unlawful indirect
        discrimination.
      </p>
      <p>
        Please provide a formal response to my complaint in writing within n the
        next seven days, and either: <br />
        1) confirm that you will amend your policy of refusing applications to
        individuals in receipt of benefits s and permit me to apply to rent, and{" "}
        <br />
        2) confirm that from now on, you will cease any practice, policy or
        procedure of refusing to consider applications to rent from individuals
        who receive benefits or <br />
        3) provide me with written reasons as to why you take the view that
        refusing my application/refusing to consider applications from
        individuals in receipt of benefits is justifiable <br /> <br />
        Yours sincerely,
        <br /> {name}
      </p>
    </div>
  );

  const trigger = (value, set, next) => {
    set(value.value);
    return next;
  };

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
      delay: 1000,
    },
    {
      id: "start1",
      message:
        "With just a few easy questions, we can create a personalised letter for you to send to them. Let them know what they’re doing wrong, and they might rethink their policies. You might even have grounds for a legal case against them, but we’ll get to that later.",
      trigger: "start3",
      delay: 4000,
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
      trigger: "start4",
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
          },
        },
        // TODO - what's the next step if "no" is selected?
        {
          value: false,
          label: "No, tell me more",
          trigger: () => {
            // nprogress.set(0.5);
            return "tellMeMore";
          },
        },
      ],
    },
    {
      id: "tellMeMore",
      message: "Here is some more information about this chatbot...",
      trigger: "tellMeMoreAcknowledge",
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
          },
        },
      ],
    },
    {
      id: "askName",
      message:
        "Great! 😀 What’s your full name? We need this to say who the letter is from.",
      trigger: () => {
        // nprogress.set(0.15);
        return "setName";
      },
    },
    {
      id: "setName",
      user: true,
      validator: (value) => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        return true;
      },
      trigger: (value) => trigger(value, setName, "askWereYouRefused"),
      metadata: {
        capture: name,
      },
    },
    {
      id: "askWereYouRefused",
      // TODO - Displaying full name here like "Hi James Brittan" is a possibly a bit weird.
      // We can split this to use just the first name "Hi James" but this assumes the name is in British/western format (or something like that)
      // Korean names would break this for example
      message:
        "Hi {previousValue}. Have you been refused the chance to rent a property because you receive benefits?",
      trigger: "setWereYouRefused",
    },
    {
      id: "setWereYouRefused",
      options: [
        { value: true, label: "Yes", trigger: "askWhichBenefits" },
        // TODO - what happens if the user selects "no"
        { value: false, label: "No", trigger: "askWhichBenefits" },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askWhichBenefits",
      message: "Can you tell us what kind of benefits you receive?",
      trigger: "setWhichBenefits",
    },
    {
      id: "setWhichBenefits",
      options: [
        {
          value: "pip",
          label: "Personal Independence Payment (PIP)",
          trigger: "askHowDoYouIdentify",
        },
        {
          value: "housing benefit",
          label: "Housing benefit",
          trigger: "askHowDoYouIdentify",
        },
        {
          value: "employment allowance",
          label: "Employment Allowance",
          trigger: "askHowDoYouIdentify",
        },
        {
          value: "universal credit",
          label: "Universal Credit",
          trigger: "askHowDoYouIdentify",
        },
        {
          value: "other",
          label: "Other – please specify",
          trigger: "setWhichBenefitsFreeText",
        },
      ],
      metadata: {
        capture: "whichBenefits",
      },
    },
    {
      id: "setWhichBenefitsFreeText",
      user: true,
      validator: (value) => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askHowDoYouIdentify",
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askHowDoYouIdentify",
      message:
        "And can you tell us how you identify? We’re asking this so we can build a picture of who is affected by DSS discrimination.",
      trigger: "setHowDoYouIdentify",
    },
    {
      id: "setHowDoYouIdentify",
      // TODO - Should there be a "prefer not to say" option here?
      options: [
        {
          value: "male",
          label: "Male",
          trigger: (value) => trigger(value, setGender, "askDisability"),
        },
        {
          value: "female",
          label: "Female",
          trigger: (value) => trigger(value, setGender, "askDisability"),
        },
        {
          value: "non-binary",
          label: "Non-binary",
          trigger: (value) => trigger(value, setGender, "askDisability"),
        },
        {
          value: "other",
          label: "Other – can I explain?",
          trigger: "setHowDoYouIdentifyFreeText",
        },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "setHowDoYouIdentifyFreeText",
      user: true,
      validator: (value) => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askDisability",
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askDisability",
      message: "And do you have a disability, and/or long-term ill health?",
      trigger: "setDisability",
    },
    {
      id: "setDisability",
      // TODO - Should this lead to a free text input for more information if "yes" is selected?
      options: [
        { value: true, label: "Yes", trigger: "askWrittenProof" },
        { value: false, label: "No", trigger: "askWrittenProof" },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askWrittenProof",
      message:
        "Do you have written proof of an agent or landlord’s refusal to rent a property to you, because you receive benefits? 📝 For example, this could be a text message, email or letter.",
      trigger: "setWrittenProof",
    },
    {
      id: "setWrittenProof",
      // TODO - Do we need to capture this proof, or is knowing of its existence enough?
      // TODO - What happens if they answer "no"?
      options: [
        { value: true, label: "Yes", trigger: "askDate" },
        { value: false, label: "No", trigger: "askDate" },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askDate",
      message:
        "And when did this happen? If you don’t know the exact day, the month and year would be helpful.",
      trigger: "setDate",
    },
    {
      // TODO - possible improvement: a datepicker would be useful here
      id: "setDate",
      user: true,
      validator: (value) => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: "askLettingAgentOrLandlord",
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askLettingAgentOrLandlord",
      message:
        "Was it a landlord or letting agent who refused to rent you the property?",
      trigger: "setLettingAgentOrLandlord",
    },
    {
      id: "setLettingAgentOrLandlord",
      options: [
        { value: "landlord", label: "Landlord", trigger: "askLinkToAd" },
        {
          value: "letting agent",
          label: "Letting agent",
          trigger: "askLinkToAd",
        },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askLinkToAd",
      message:
        "Got it 👌 Do you have a web link to the advert of the property? Don’t worry if not.",
      trigger: "setLinkToAd",
    },
    {
      id: "setLinkToAd",
      // TODO - Do we need the link itself?
      options: [
        { value: true, label: "Yes", trigger: "responseLinkToAd" },
        { value: false, label: "No", trigger: "responseLinkToAd" },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      // TODO - this reads like the user has answered "no" to the previous question regardless of answer.
      id: "responseLinkToAd",
      message:
        "That’s ok. Now, we want to hear just a bit more about you, so we can personalise your letter.",
      delay: 1000,
      trigger: "askRentedSuccessfully",
    },
    {
      id: "askRentedSuccessfully",
      message:
        "Have you rented successfully before, paying your rent in full and on time? (We know this seems personal, but it’s completely confidential and helps us build a picture of your situation)",
      trigger: "setRentedSuccessfully",
    },
    {
      id: "setRentedSuccessfully",
      options: [
        {
          value: true,
          label: "Yes",
          trigger: "askHowManyYearsRentedSuccessfully",
        },
        {
          value: false,
          label: "No",
          trigger: "askHowManyYearsRentedSuccessfully",
        },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askHowManyYearsRentedSuccessfully",
      // TODO - this reads like the user has answered "yes" to the previous question
      message:
        "Brilliant! ✅ And for how many years? This might seem nosey, but we’re trying to build your case as a great tenant.",
      trigger: "setHowManyYearsRentedSuccessfully",
    },
    {
      // TODO - select list would be better than free text here
      id: "setHowManyYearsRentedSuccessfully",
      user: true,
      validator: (value) => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: (value) =>
        trigger(value, setYearsInCurrentHome, "askCanYouGetLandlordReference"),
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askCanYouGetLandlordReference",
      message:
        "Ok – nearly finished. Could you get a good reference from your last landlord?",
      trigger: "setCanYouGetLandlordReference",
    },
    {
      id: "setCanYouGetLandlordReference",
      options: [
        { value: true, label: "Yes", trigger: "askDoYouHaveSavings" },
        { value: false, label: "No", trigger: "askDoYouHaveSavings" },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "askDoYouHaveSavings",
      message:
        "Do you have access to savings, and could you pay some rent in advance? Or do you have someone who could be your guarantor? A guarantor is someone who can pay your rent if you end up unable to.",
      trigger: "setDoYouHaveSavings",
    },
    {
      id: "setDoYouHaveSavings",
      options: [
        {
          value: { savings: "yes", rent: "no", guarantor: null },
          label: "I have savings but could not pay rent in advance",
          trigger: (value) => {
            setHasSavings(true);
            setCanPayRentInAdvance(false);
            return "responseDoYouHaveSavings";
          },
        },
        {
          value: { savings: "yes", rent: "some", guarantor: null },
          label: "I have savings and could pay some rent in advance",
          trigger: (value) => {
            // TODO - this doesn't reflect "some" answer correctly
            setHasSavings(true);
            setCanPayRentInAdvance(true);
            return "responseDoYouHaveSavings";
          },
        },
        {
          value: { savings: null, rent: null, guarantor: "yes" },
          label: "I have someone who could be a guarantor",
          trigger: (value) => {
            setHasGuarantor(true);
            return "responseDoYouHaveSavings";
          },
        },
        {
          value: { savings: "no", rent: "no", guarantor: "no" },
          label: "I don’t have any of these",
          trigger: (value) => {
            setHasGuarantor(false);
            setHasSavings(false);
            setCanPayRentInAdvance(false);
            return "responseDoYouHaveSavings";
          },
        },
        {
          value: { savings: "unsure", rent: "unsure", guarantor: "unsure" },
          label: "I’m not sure",
          trigger: (value) => {
            // TODO - this doesn't reflect "unsure" answer correctly
            setHasGuarantor(false);
            setHasSavings(false);
            setCanPayRentInAdvance(false);
            return "responseDoYouHaveSavings";
          },
        },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      id: "responseDoYouHaveSavings",
      message: "Thanks for sticking with us so far! 👍",
      delay: 1000,
      trigger: "askMonthlyIncome",
    },
    {
      id: "askMonthlyIncome",
      message:
        "Do you know roughly what your monthly income is? Please enter the amount below.",
      trigger: "setMonthlyIncome",
    },
    {
      id: "setMonthlyIncome",
      user: true,
      validator: (value) => {
        console.log(value);
        if (typeof value !== "string") {
          return "value should be a string";
        }
        // setName(value);
        return true;
      },
      trigger: (value) => trigger(value, setIncome, "end1"),
    },
    {
      id: "end1",
      message: "OK then – we’re all done! 🎉",
      trigger: "end2",
    },
    {
      id: "end2",
      message:
        "We think this is great evidence and hope it will encourage your landlord or agent to change their policies. You may also have a good case for indirect discrimination.",
      trigger: "end3",
    },
    {
      id: "end3",
      message:
        "Sadly we can’t guarantee that they will change their policies, or that you would be successful in claiming for discrimination. But we would still encourage you to send your personalised letter to the agent or landlord. Increasing awareness of discrimination against people receiving benefits might mean you have an easier time renting in the future, and help landlords make sure they’re acting lawfully.",
      trigger: "end4",
    },
    {
      id: "end4",
      message:
        "You’re not only standing up for yourself, but for others in similar situations – and together, we’re more likely to make change happen.",
      trigger: "end5",
    },
    {
      id: "end5",
      // TODO - add link
      message:
        "Great! Here you go. Just click on the link to download your letter.",
      trigger: "end6",
    },
    {
      id: "end6",
      message:
        "By sending this letter, you’re helping us fight against ‘no DSS’ discrimination. This could improve the future of renters like you and others, who simply want a place to call home. We can’t do this without your help, so thank you for getting involved.",
      trigger: "askMoreHelp",
    },
    {
      id: "askMoreHelp",
      message:
        "Do you want more help, or to know more about our No DSS campaign?",
      trigger: "setMoreHelp",
    },
    {
      id: "setMoreHelp",
      // TODO - what happens if the user select "yes"?
      options: [
        { value: true, label: "Yes", trigger: "end7" },
        { value: false, label: "No", trigger: "end7" },
      ],
      metadata: {
        capture: "wereYouRefused",
      },
    },
    {
      // TODO - needs completion message
      id: "end7",
      message:
        "Thank you, more information can be found at https://england.shelter.org.uk/support_us/campaigns/dss",
      end: true,
    },
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
    <>
      <ChatBot
        headerTitle="Pocket Lawyer"
        botAvatar="https://res.cloudinary.com/dk5jxmsza/image/upload/v1580921453/shelter_h.gif"
        steps={steps2}
        handleEnd={handleEnd}
      />
      {finished && letterText()}
    </>
  );
};

export default ReactSimpleChatbot;
