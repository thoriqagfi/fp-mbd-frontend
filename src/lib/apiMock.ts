import axios, { AxiosError } from 'axios';

export const apiMock = axios.create({
  baseURL: process.env.API_URL,
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