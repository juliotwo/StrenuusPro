'use client';
import axios from 'axios';
import { TRANSACTION } from './urls';

export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post(TRANSACTION, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': process.env.API_KEY,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
