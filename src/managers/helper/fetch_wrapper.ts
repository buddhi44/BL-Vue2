import { useAuthStore } from '@/stores/authstore';
import axios, { type AxiosResponse } from 'axios'

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}


const request = (method: string) => async (url: string, body?: any) => {
  
  const {data}= await axios.post(url,body,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "IntegrationID":"1aa6a39b-5f54-4905-880a-a52733fd6105"
            }
  })
  console.log(data)
  return {
    Token:data.token,
    RefreshToken:data.refreshToken,
    IsSuccess:data.isSuccess
  }
};

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
};


// helper functions

// const authHeader = (url: string): Record<string, string> => {

//   const { user } = useAuthStore();
//   const isLoggedIn = !!user?.token;
//   const isApiUrl = url.startsWith(import.meta.env.BASE_URL);

//   if (isLoggedIn && isApiUrl) {
//     return { Authorization: `Bearer ${user.token}` };
//   } else {
//     return {};
//   }
// };

// const handleResponse = (response: AxiosResponse): Promise<any> =>
// {
//     console.log(response.statusText)
//     if (response.statusText!=='ok') {
//       const { user, logout } = useAuthStore();
//       if ([401, 403].includes(response.status) && user) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from API
//         logout();
//       }

//       const error = (response.data && response.data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return response.data;
//   };
