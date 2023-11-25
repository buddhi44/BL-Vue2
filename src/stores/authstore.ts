import { defineStore } from 'pinia';
import router from '@/router'
import { fetchWrapper } from '@/managers/helper/fetch_wrapper';
import { StorageConstant } from '@/core/application/constant/storag_econstants';

const baseUrl: string = `${import.meta.env.BASE_URL}`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    authToken: JSON.parse(localStorage.getItem(StorageConstant.AuthToken) || 'null') as string | null,
    returnUrl: null as string | null,
  }),
  actions: {
    async login(username: string, password: string): Promise<void> {
      var _tokenRequest: TokenRequest = {
        UserName: username,
        Password: password
      };

      var result : TokenResponse = {
        Token : "t-string",
        RefreshToken : "rt-string",
        IsSuccess : false
      };
      console.log("before request",_tokenRequest)
      result = await fetchWrapper.post("https://bluelotus360.co/CoreAPI/api/Authentication/Authenticate", _tokenRequest);
      console.log(result)
      if (result != null && result.IsSuccess)
      {
        console.log("success")
        localStorage.setItem(StorageConstant.AuthToken, JSON.stringify(result.Token));
        localStorage.setItem(StorageConstant.RefreshToken, JSON.stringify(result.RefreshToken));
        router.push(this.returnUrl || '/');
      }
      
    },
    logout(): void {
      //this.authToken = null;
      localStorage.removeItem(StorageConstant.AuthToken);
      localStorage.removeItem(StorageConstant.RefreshToken);
      router.push('/login');
    },
  },
});
