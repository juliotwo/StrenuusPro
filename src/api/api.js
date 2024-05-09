import axios from 'axios';
import { TRANSACTION } from './urls';

export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post(TRANSACTION, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': `6N3EO55S1n7IYCZuAoNRphyTm6Pzn0OoKrcMn4FneRYaYBO0WeaV3Co2bzYXKSwx`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
