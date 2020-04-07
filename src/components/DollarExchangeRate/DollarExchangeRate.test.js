import { render, waitForElement, fireEvent } from '@testing-library/react';
import React from 'react'

import DollarExchangeRate from './DollarExchangeRate'

test('Render all information with money payment', async () => {
    const { getByTestId } = render(<DollarExchangeRate />)
    const inputDollarValue = await waitForElement(() => getByTestId('dollar-value'))
    const inputStateTax = await waitForElement(() => getByTestId('state-tax'))
    const moneyPayment = await waitForElement(() => getByTestId('money'))
    const moneyValue = 1000
    const taxValue = 10
    
    fireEvent.change(inputDollarValue, { target: { value:moneyValue } })
    fireEvent.blur(inputDollarValue)
    fireEvent.change(inputStateTax, { target: { value:taxValue } })
    fireEvent.blur(inputStateTax)
    fireEvent.click(moneyPayment)

    const dollarValueWithoutTax = await waitForElement(() => getByTestId('dollar-value-without-tax'))
    const dollarValueWithTax = await waitForElement(() => getByTestId('dollar-value-with-tax'))
    const IOFTax = await waitForElement(() => getByTestId('IOF'))
    
    expect(dollarValueWithoutTax).toHaveTextContent('1000')
    expect(dollarValueWithTax).toHaveTextContent('1100')
    expect(IOFTax).toHaveTextContent('1.1')
   
})

test('Render all information with card payment', async () => {
    const { getByTestId } = render(<DollarExchangeRate />)
    const inputDollarValue = await waitForElement(() => getByTestId('dollar-value'))
    const inputStateTax = await waitForElement(() => getByTestId('state-tax'))
    const cardPayment = await waitForElement(() => getByTestId('credit-card'))
    const moneyValue = 1000
    const taxValue = 10
    
    fireEvent.change(inputDollarValue, { target: { value:moneyValue } })
    fireEvent.blur(inputDollarValue)
    fireEvent.change(inputStateTax, { target: { value:taxValue } })
    fireEvent.blur(inputStateTax)
    fireEvent.click(cardPayment)

    const dollarValueWithoutTax = await waitForElement(() => getByTestId('dollar-value-without-tax'))
    const dollarValueWithTax = await waitForElement(() => getByTestId('dollar-value-with-tax'))
    const IOFTax = await waitForElement(() => getByTestId('IOF'))
    
    expect(dollarValueWithoutTax).toHaveTextContent('1000')
    expect(dollarValueWithTax).toHaveTextContent('1100')
    expect(IOFTax).toHaveTextContent('6.4')
   
})


