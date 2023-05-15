
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  cursor: pointer;
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

    const [products, setproducts] = useState([]);

    //console.log("dados do servidor: ", products);

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

    const productCode = csvData.slice(1).map((row) =>(row.map((column, index) => index === 0 ? column : null)));
    console.log("codigo do produto", productCode);

    const getProducts = async (productCode) =>{
        try{
            const res = await axios.get(`http://localhost:8800?code=${productCode}`);
            setproducts(res.data);
            console.log("resposta: ",productCode);
        } catch(error) {
            toast.error(error);
            console.error(error);
        }
      };

    
      useEffect(() => {
        getProducts(productCode);
      }, [setproducts]); 

      //getProducts(productCode);

      console.log("produto do bd:", products );

    return (
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
                                        <Td key={index}>{column} {console.log(column,index)}</Td> 
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
            )}
        </PageContainer>
    );
}

export default Home;
