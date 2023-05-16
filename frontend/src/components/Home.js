import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import "react-toastify/dist/ReactToastify.css";
import GetProducts from './GetProducts';

const PageContainer = styled.div`
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const InputContainer = styled.div`
  background-color: #e9e9e9;
  box-shadow: 2px 2px 5px #c0c0c0;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #3a6ea5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
`;

const TableContainer = styled.div`
  background-color: #e9e9e9;
  box-shadow: 2px 2px 5px #c0c0c0;
  padding: 20px;
  margin-top: 20px;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const ButtonValidar = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 52px;
    width: 100px;
    margin-top: 20px;
`;

const Th = styled.th`
  background-color: #3a6ea5;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

function Home() {
    const [csvData, setCsvData] = useState([]);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            const data = result.split('\n').map((row) => row.split(','));
            setCsvData(data);
            setFileName(file.name);
        };
        reader.readAsText(file);
    };

   const productCode = csvData.slice(1).map((row) => (row.map((column, index) => index === 0 ? column : '')));

    if(productCode!==undefined) {
        console.log("codigo do produto: ", productCode);
        GetProducts(productCode);
    }

    return (
        <>
        <PageContainer>
            <InputContainer>
                {fileName && <p>{fileName}</p>}
                <Button>
                    <input type="file" accept=".csv" onChange={handleFileUpload} />
                </Button>
            </InputContainer>
            {csvData.length > 0 && (
                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                {csvData[0].map((column, index) => (
                                    <Th key={index}>{column}</Th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.slice(1).map((row, index) => (
                                <tr key={index}>
                                    {row.map((column, index) => (
                                        <Td key={index}>{column} {console.log(column, index)}</Td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            )}
            <ButtonValidar>VALIDAR</ButtonValidar>
        </PageContainer>
        </>
    );
}

export default Home;
