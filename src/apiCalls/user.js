import axios from 'axios';
import config from '../config/index';

const userClient = axios.create({
  baseURL: config.apiHost,
  timeout: config.timeout,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
  }
});
userClient.interceptors.response.use(
  function (response) {
    return response;
  }
  // function (error) {
  //   if (error.response.status === 401 && error.response.data.code === 10005) {
  //     localStorage.removeItem('jwt');
  //     localStorage.removeItem('user');
  //     // location.reload();
  //   }
  //   return error;
  // }
);
export async function addDriver(data) {
  let result = await userClient
    .post('accounts/create-driver/', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
export async function updateDriver(id, data) {
  let result = await userClient
    .patch(`/accounts/update-driver/${id}/`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}

export async function listUsers(data) {
  let result = await userClient
    .post('/accounts/users/', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
export async function deleteDriver(id) {
  let result = await userClient
    .delete(`/accounts/delete-driver/${id}/`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
