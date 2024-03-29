import { useEffect, useState } from "react";
import "./Currency.css";
import axios from "axios";
function Currency(){
    const[amount,setAmount]=useState(1);
    const[fromCurrency,setFromCurrency]=useState("USD");
    const[toCurrency,setToCurrency]=useState("INR");
    const[covertCurrency,setConvertCurrency]=useState(null);
    const[exchange,setExchange]=useState(null)

    useEffect(()=>{
        let getExchange=async()=>{
            try{
                let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
                const res= await axios.get(url);
                setExchange(res.data.rates[toCurrency])
            }catch(error){
                console.error("is error ",error);
            }
        }
        getExchange()
    },[fromCurrency,toCurrency]);



    useEffect(()=>{
            if(exchange!==null){
                setConvertCurrency((amount*exchange).toFixed(2))
            }
    },[amount,exchange])



     function handleamount(e){
        let val=parseFloat(e.target.value);
        setAmount(val===isNaN? 0:val);
     }
    return(
            <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="imageSec">
                            <img src="./images/3.png" alt="currency"/>
                        </div>
                    </div>
                        <div className="contentSec">
                            <h1>Currency Converter</h1>
                            <label>Amount:</label>
                            <input type="number" value={amount} onChange={handleamount} />
                            <label htmlFor="fromCurrency">From Currency:</label>
                            <select id="fromCurrency" value={fromCurrency} onChange={(e)=>setFromCurrency(e.target.value)}>
                                <option value="USD">USD -United States Dollar</option>
                                <option value="EUR">EUR-Euro</option>
                                <option value="GBP">GBP-British Pound Streling</option>
                                <option value="JPY">JPY-Japanese Yen</option>
                                <option value="AUD">AUD-Australian Dollar</option>
                                <option value="CAD">CAD-Canadian Dollar</option>
                                <option value="CNY">CNY-Chinese Yuan</option>
                                <option value="INR">IND-Indian rupees</option>
                                <option value="BRL">BRL-Brazilian Real</option>
                                <option value="ZAR">ZAR-South African Rand</option>

                            </select>
                            <label htmlFor="tocurrency">To Currency:</label>
                            <select id="toCurrency" value={toCurrency} onChange={(e)=>setToCurrency(e.target.value)}>
                                <option value="USD">USD -United States Dollar</option>
                                <option value="EUR">EUR-Euro</option>
                                <option value="GBP">GBP-British Pound Streling</option>
                                <option value="JPY">JPY-Japanese Yen</option>
                                <option value="AUD">AUD-Australian Dollar</option>
                                <option value="CAD">CAD-Canadian Dollar</option>
                                <option value="CNY">CNY-Chinese Yuan</option>
                                <option value="INR">IND-Indian rupees</option>
                                <option value="BRL">BRL-Brazilian Real</option>
                                <option value="ZAR">ZAR-South African Rand</option>
                            </select>
                            <p>{amount} {fromCurrency} is equal to {covertCurrency} {toCurrency}</p>
                        </div>

                </div>

            </div>
            </>
    )
}

export default Currency;