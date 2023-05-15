import  GlobalStyle  from "./styles/global";
import Styled, { styled } from "styled-components";
import Home from "./components/Home.js";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  

  return (
    <>
    <Container>
      <Title>PRODUTOS</Title>
      <Home />
    </Container>
      <ToastContainer autoClose={300} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle /> 
    </>
  );
}

export default App;
