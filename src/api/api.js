import axios from 'axios';
import { TRANSACTION, SEND_EMAIL } from './urls';

const API_KEY =
  '6N3EO55S1n7IYCZuAoNRphyTm6Pzn0OoKrcMn4FneRYaYBO0WeaV3Co2bzYXKSwx';
// const API_KEY =
//   'zwgqaebUA0pr2q0iEcpu20gySPqD40x8ssMLGyPwtecfjq7w5RYyyvmlrlIhFGRO'; // dev
export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post(TRANSACTION, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY':
            '6N3EO55S1n7IYCZuAoNRphyTm6Pzn0OoKrcMn4FneRYaYBO0WeaV3Co2bzYXKSwx',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  sendEmail: async (data) => {
    try {
      const response = await axios.post(SEND_EMAIL, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': API_KEY,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
