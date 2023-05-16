import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import React, {useEffect, useState} from 'react';

function GetProducts({productCode}) {
    const [products, setproducts] = useState([]);
    console.log("product code:", productCode);

    const getProducts = async (id) => {
        try {
            if (productCode !== null) {
                const res = await axios.get(`http://localhost:8800?code=${productCode}`);
                setproducts(res.data);
                console.log("resposta: ", productCode);
            }
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };

    useEffect(() => {
        if(productCode !== null){
            getProducts();
        }
    }, [setproducts]);

    console.log("products:", products);
} 

export default GetProducts;