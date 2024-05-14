import axios from 'axios';
import { TRANSACTION } from './urls';

export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post(TRANSACTION, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': `zwgqaebUA0pr2q0iEcpu20gySPqD40x8ssMLGyPwtecfjq7w5RYyyvmlrlIhFGRO`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  publicApi: async (data) => {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/ditto',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  },
};
