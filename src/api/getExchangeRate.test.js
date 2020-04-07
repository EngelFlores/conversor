import axios from 'axios';
import getDollarExchangeRateAPI from './getExchangeRate';

const URL = `${process.env.REACT_APP_API_URI}/json`;

jest.mock('axios');

test('should get dollar commercial exchange rate', () => {
  getDollarExchangeRateAPI.getCommercialDollarExchangeRate();
  expect(axios.get).toHaveBeenCalledWith(`${URL}/USD-BRL`);
});

test('should get dollar tourism exchange rate', () => {
    getDollarExchangeRateAPI.getTourismDollarExchangeRate();
    expect(axios.get).toHaveBeenCalledWith(`${URL}/USDT-BRL`);
  });