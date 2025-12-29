import axios from 'axios';
import config from '../config/index';
const bookingClient = axios.create({
    baseURL: config.apiHost,
    timeout: config.timeout,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('jwt')
    }
  });
  bookingClient.interceptors.response.use(
    function (response) {
      return response;
    }
    );
    export async function listBookings(data) {
        let result = await bookingClient
          .post('/booking/ride/list/', data)
          .then((res) => {
            return res;
          })
          .catch((err) => {
            return err?.response?.data;
          });
        return result;
      }