import React, { useRef } from "react";
import styled from "styled-components";
import {parse} from "papaparse";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Form = ({ onEdit }) => {
    const ref = useRef();

    return (
        <FormContainer ref={ref}>
            <InputArea
                onDragOver={(event) => {
                    event.preventDefault()
                    console.log("arrastando em cima")
                }}
                onDrop={(event) => {
                    event.preventDefault()
                    console.log("largou")
                    console.log(event.dataTransfer.files)
                    Array.from(event.dataTransfer.files).map(async file => {
                        let text = await file.text()
                        let result = parse(text, {header: true})
                        console.log(result)
                    })
                }}
            >
                <Label>Arraste o arquivo aqui</Label>
            </InputArea>
        </FormContainer>
    );
};

export default Form;