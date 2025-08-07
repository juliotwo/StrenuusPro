import axios from 'axios';
import { TRANSACTION, SEND_EMAIL, SEND_EMAIL_TEST } from './urls';

const API_KEY =
  'j7lGoXeNnALr8jAZsMOA35UMAqWStZR5orRIM4ilkSFIp4MRHpnKkOakv3ID9MJQ';

export const ApiTransaction = {
  makeTransaction: async (data) => {
    try {
      const response = await axios.post(TRANSACTION, data, {
        headers: {
          'Content-Type': 'application/json',
          'MERCHANT-API-KEY': API_KEY,
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
