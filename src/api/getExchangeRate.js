
import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URI}/json`;

export default {
  async getCommercialDollarExchangeRate() {
    return await axios.get(`${URL}/USD-BRL`);
  },
  async getTourismDollarExchangeRate() {
    return await axios.get(`${URL}/USDT-BRL`);
  }
};