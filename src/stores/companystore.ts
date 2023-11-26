import { defineStore } from 'pinia';
import router from '@/router'
import {TokenEndPoint} from '@/router/token_endpoint'
import { fetchWrapper } from '@/managers/helper';
import axios, { type AxiosResponse } from 'axios'
import { CompanySelectionModal } from '@/core/application/auth/company';
import { useAuthStore } from '@/stores/authstore';
import { StorageConstant } from '@/core/application/constant/storag_econstants';

export const useCompanyStore = defineStore({
    id: 'companies',
    state: () => ({
        companies: [] as CompanySelectionModal[]
    }),
    actions: {
        async getAll() {
            const auth=useAuthStore()
            const headers = {
                "Authorization":`Bearer ${auth.authToken}`,
                "Content-Type":"application/json",
                "Accept":"application/json",
                "IntegrationID":"1aa6a39b-5f54-4905-880a-a52733fd6105" 
              };
            await axios.post(TokenEndPoint.CompanyListingEndPoint,{CompanyKey:1,CompanyName:'',CompanyCode:''},{headers:headers})
                              .then(res => {
                                    this.companies = res.data
                                })
                              .catch(error => {
                                    console.log(error)
             })

                
        },

        async updateSelectedCompany(){
            const auth=useAuthStore()
            const headers = {
                "Authorization":`Bearer ${auth.authToken}`,
                "Content-Type":"application/json",
                "Accept":"application/json",
                "IntegrationID":"1aa6a39b-5f54-4905-880a-a52733fd6105" 
              };
            console.log("company auth before accesss")  
            await axios.post(TokenEndPoint.CompanySelectedEndPoint,{CompanyKey:156,CompanyName:'Demo - Company',CompanyCode:'DC'},{headers:headers})
                            .then(res => {

                                var company_token:TokenResponse={
                                    Token:res.data.token,
                                    RefreshToken:res.data.refreshToken,
                                    IsSuccess:res.data.isSuccess
                                }

                                console.log(res.data)
                                if (company_token != null && company_token.IsSuccess)
                                {
                                    console.log("company auth success")
                                    auth.authToken = company_token.Token

                                    localStorage.setItem(StorageConstant.AuthToken, JSON.stringify(company_token.Token));
                                    localStorage.setItem(StorageConstant.RefreshToken, JSON.stringify(company_token.RefreshToken));
                                    localStorage.setItem(StorageConstant.CompanyName, JSON.stringify('Demo - Company'));
                                    localStorage.setItem(StorageConstant.IsCompanyAuthAccess, JSON.stringify(true));
                                    router.push('/');
                                }

                                })
                            .catch(error => {
                                console.log("error")
                                    console.log(error)
                            })
        }
    }
});