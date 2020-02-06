import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import ReactSimpleChatbot from "./ReactSimpleChatbot";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5em;
`;

const theme = {
  background: "#fff",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#ea232d",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#f0f0f0",
  botFontColor: "#000",
  userBubbleColor: "#ea232d",
  userFontColor: "#fff"
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <ReactSimpleChatbot />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
