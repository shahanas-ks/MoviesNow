import axios from 'axios';
import config from '../config/index';
const routeManage = axios.create({
  baseURL: config.apiHost,
  timeout: config.timeout,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('jwt')
  }
});
routeManage.interceptors.response.use(function (response) {
  return response;
});
export async function listRoutes(data) {
  let result = await routeManage
    .get('/booking/routes/list/', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
export async function addRoute(data) {
  let result = await routeManage
    .post('/booking/routes/create/', data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
export async function deleteRoute(id) {
  let result = await routeManage
    .delete(`/booking/routes/delete/${id}/`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
export async function updateRoute(id,data) {
  let result = await routeManage
    .put(`/booking/routes/update/${id}/`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response?.data;
    });
  return result;
}
