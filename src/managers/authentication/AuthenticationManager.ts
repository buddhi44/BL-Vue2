import type {IAuthenticationManager} from "./IAuthenticationManager";
import axios from 'axios'

export default class AuthenticationManager implements IAuthenticationManager {

    async authenticate(request: TokenRequest): Promise<TokenResponse> {
        console.log()
        var token : TokenResponse = {
            Token : "t-string",
            RefreshToken : "rt-string",
            IsSuccess : false
        }
        const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/Authentication/Authenticate`,request,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "IntegrationID":import.meta.env.VITE_INTEGRATION_ID
            }
        })
        return {
            Token:data.token,
            RefreshToken:data.refreshToken,
            IsSuccess:data.isSuccess
        }
    }
}