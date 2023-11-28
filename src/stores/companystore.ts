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
        async getAll() 
        {
            const auth=useAuthStore()
              var res = await fetchWrapper.post(TokenEndPoint.CompanyListingEndPoint, {CompanyKey:1,CompanyName:'',CompanyCode:''});
              this.companies=res as CompanySelectionModal[] ;
              console.log("companies",res)

        },

        async updateSelectedCompany(company:CompanySelectionModal)
        {
            console.log("selected company",company)
            const auth=useAuthStore()
            console.log("company auth before accesss")  
            await fetchWrapper.post(TokenEndPoint.CompanySelectedEndPoint,{CompanyKey:company.CompanyKey,CompanyName:company.CompanyName,CompanyCode:company.CompanyCode})
                            .then(res => {

                                var company_token:TokenResponse={
                                    Token:res.token,
                                    RefreshToken:res.refreshToken,
                                    IsSuccess:res.isSuccess
                                }

                                console.log(res)
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