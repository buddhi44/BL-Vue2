import { defineStore } from 'pinia';
import router from '@/router'
import { fetchWrapper } from '@/managers/helper/fetch_wrapper';
import { StorageConstant } from '@/core/application/constant/storag_econstants';
import {TokenEndPoint} from '@/router/token_endpoint'

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

      console.log("before request",_tokenRequest)
      var res = await fetchWrapper.post(TokenEndPoint.AuthenticateURL, _tokenRequest);

      var result : TokenResponse = {
        Token:res.token,
        RefreshToken:res.refreshToken,
        IsSuccess:res.isSuccess
      }

      
      if (result != null && result.IsSuccess)
      {
        console.log("success")
        this.authToken = result.Token;
        localStorage.setItem(StorageConstant.AuthToken, JSON.stringify(result.Token));
        localStorage.setItem(StorageConstant.RefreshToken, JSON.stringify(result.RefreshToken));
        router.push(this.returnUrl || '/companyselection');
      }
      
    },
    logout(): void {
      this.authToken = null;
      localStorage.removeItem(StorageConstant.AuthToken);
      localStorage.removeItem(StorageConstant.RefreshToken);
      localStorage.removeItem(StorageConstant.CompanyName);
      localStorage.removeItem(StorageConstant.IsCompanyAuthAccess);
      router.push('/login');
    },
  },
});
