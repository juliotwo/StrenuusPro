import axios from 'axios';
import { TRANSACTION, SEND_EMAIL, SEND_EMAIL_TEST } from './urls';

 const API_KEY = '6N3EO55S1n7IYCZuAoNRphyTm6Pzn0OoKrcMn4FneRYaYBO0WeaV3Co2bzYXKSwx';
//const API_KEY_DEV =
 // 'bbvCp0Uo04cux3MONopMsX2LQdn03fC9aAWpuB9StKUqAdbjXj7Hqa4uaApwNc5b';
export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post(TRANSACTION, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': API_KEY_DEV,
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
          'MERCHANT-API-KEY': API_KEY_DEV,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  sendEmailTest: async () => {
    let data = {
      email_for_admin_data: {
        client: 'Julio',
        email: 'juliotwo1996@gmail.com',
        name: 'Strenus',
        amount: 10,
        order_number: '121212',
        service: 'Prueba de servicio',
        sender: 'info@capapay.mx',
      },
      email_for_client_data: {
        email: 'juliotwo1996@gmail.com',
      },
    };
    try {
      const response = await axios.post(SEND_EMAIL_TEST, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': API_KEY_DEV,
        },
      });
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
