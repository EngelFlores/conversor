import React from 'react';
import Input from '../Input/Input'

const PaymentMethod = ({ onChange }) => {

    return (
        <div>
            <p>Escolha meio de pagamento:</p>
            <Input idTest="money" value="dinheiro" name="payment" type="radio" label="Dinheiro" onChange={onChange}></Input>
            <Input idTest="credit-card" value="cartao" name="payment" type="radio" label="Cartão" onChange={onChange} ></Input>
        </div>
    )
}

export default PaymentMethod

