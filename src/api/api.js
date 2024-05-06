'use client';
import axios from 'axios';
import { TRANSACTION } from './urls';

export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post('/api/proxy', data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': `6N3EO55S1n7IYCZuAoNRphyTm6Pzn0OoKrcMn4FneRYaYBO0WeaV3Co2bzYXKSwx`,
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
