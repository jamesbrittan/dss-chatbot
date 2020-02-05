import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import ReactSimpleChatbot from "./ReactSimpleChatbot";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4em;
`;

const App = () => {
  return (
    <Wrapper>
      <ReactSimpleChatbot />
    </Wrapper>
  );
};

export default App;
