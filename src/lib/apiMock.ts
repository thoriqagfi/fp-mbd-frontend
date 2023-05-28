import * as React from 'react';
import axios, { AxiosError } from 'axios';
import { getToken } from './token';
// import { GetServerSidePropsContext } from 'next';
import Cookies from 'universal-cookie';

// const isServer = typeof window === 'undefined';
// let getServerSideProps = <GetServerSidePropsContext>{};

export const apiMock = axios.create({
  baseURL: process.env.LOGIN_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeoutErrorMessage: 'Request timed out',
});


// apiMock.interceptors.request.use(function (config) {
//   if(config.headers){
//     let token: string | undefined;
//     if(isServer) {
//       if(!getServerSideProps) throw new Error('API Context not found. ');

//       const cookies = new Cookies(getServerSideProps.req?.headers.cookie);
//       token = cookies.get('token');
//     } else {
//       token = getToken();
//     }
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
//   }
//   return config;
// })

// apiMock.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError<Record<string, string[]>>) => {
//     if(error.response?.data.message) {
//       return Promise.reject(error.response.data.message);
//     }
//   }
// )

// export default apiMock;