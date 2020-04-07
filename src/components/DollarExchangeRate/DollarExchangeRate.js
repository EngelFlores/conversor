import React, { useState, useEffect } from 'react';
import getExchangeRate from '../../api/getExchangeRate'
import Input from '../Input/Input'
import PaymentMethod from '../PaymentMethod/PaymentMethod'
import Text from '../Text/Text'
import './DollarExchangeRate.css'

const DollarExchangeRate = () => {
    const [commercialDollar, setCommercialDollar] = useState(0);
    const [tourismDollar, setTourismDollar] = useState(0);
    const [IOF, setIOF] = useState(null);
    const [totalDollarWithoutTax, setTotalDollarWithoutTax] = useState(null);
    const [stateTax, setStateTax] = useState(null);
    const [totalDollarWithTax, setTotalDollarWithTax] = useState(null);
    const [totalRealWithTax, setTotalRealWithTax] = useState(null);
    const [totalRealWithoutTax, setTotalRealWithoutTax] = useState(null);


    useEffect(() => {
        getExchangeValue()
    }, []);

    const getExchangeValue = async () => {
        try {
            const commercial = await getExchangeRate.getCommercialDollarExchangeRate();
            const tourism = await getExchangeRate.getTourismDollarExchangeRate();
            setCommercialDollar(commercial.data[0].high);
            setTourismDollar(tourism.data[0].high);
        }
        catch (err) {
            console.log(err);
        }
    }

    const IOFRate = { "dinheiro": 1.1, "cartao": 6.4 }

    const getIOF = (event) => {
        const paymentType = event.target.value
        setIOF(IOFRate[paymentType])
    }

    const calculateTotalDollarWithTax = (event) => {
        const tax = event.target.value
        setStateTax(tax)
        if (totalDollarWithoutTax && tax) {
            const total = totalDollarWithoutTax * (1 + tax / 100)
            setTotalDollarWithTax(total)
        } else {
            alert("Preencha todos os campos necessários")
        }
    }

    const calculateTotalReal = () => {
        const totalWithTax = (totalDollarWithoutTax * (1 + stateTax / 100)) * (tourismDollar * (1 + IOF / 100))
        const totalWithoutTax = totalDollarWithoutTax * tourismDollar
        setTotalRealWithTax(totalWithTax)
        setTotalRealWithoutTax(totalWithoutTax)
    }

    return (
        <div className="container">
            <div>
                <p>Cotação do dia</p>
                <p>Comercial:{`R$ ${commercialDollar}`}</p>
                <p>Turismo:{`R$ ${tourismDollar}`}</p>
            </div>
            <Input idTest="dollar-value" label="Digite o valor em Dólar:" placeholder="1200" onBlur={(event) => {
                setTotalDollarWithoutTax(event.target.value)
            }}></Input>
            <Input idTest="state-tax" label="Taxa do estado:" placeholder="10" onBlur={calculateTotalDollarWithTax}></Input>

            <PaymentMethod onChange={getIOF}></PaymentMethod>
            <Text value={IOF} text="Cotação IOF:" idTest="IOF"></Text>
            <div>
                <Text value={totalDollarWithoutTax} text="Total em dólar sem imposto: $" idTest="dollar-value-without-tax"></Text>
                <Text value={totalDollarWithTax} text="Total em dólar com imposto: $" idTest="dollar-value-with-tax"></Text>
            </div>

            <button data-testid="button" onClick={calculateTotalReal}>Calcular total em real</button>
            <Text value={totalRealWithoutTax} text="Total em real sem imposto: R$" idTest="real-value-without-tax"></Text>
            <Text value={totalRealWithTax} text="Total em real com imposto: R$" idTest="real-value-with-tax"></Text>
        </div>
    )
}

export default DollarExchangeRate