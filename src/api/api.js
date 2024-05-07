import axios from 'axios';
import { TRANSACTION } from './urls';
const fetch = require('node-fetch');

export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      // const response = await axios.post(TRANSACTION, data, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'MERCHANT-API-KEY': `6N3EO55S1n7IYCZuAoNRphyTm6Pzn0OoKrcMn4FneRYaYBO0WeaV3Co2bzYXKSwx`,
      //   },
      // });
      const response = await fetch(TRANSACTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': `6N3EO55S1n7IYCZuAoNRphyTm6Pzn0OoKrcMn4FneRYaYBO0WeaV3Co2bzYXKSwx`,
        },
        body: JSON.stringify(data),
      });
      const datos = await response.json();
      console.log(datos);
      return datos;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
