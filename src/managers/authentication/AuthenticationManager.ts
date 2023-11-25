import type {IAuthenticationManager} from "./IAuthenticationManager";
import axios from 'axios'

export default class AuthenticationManager implements IAuthenticationManager {

    async authenticate(request: TokenRequest): TokenResponse {
        console.log(import.meta.env.INTEGRATION_ID)
        var token : TokenResponse = {
            Token : "t-string",
            RefreshToken : "rt-string",
            IsSuccess : false
        }
        const {data} = await axios.post("https://bluelotus360.co/CoreAPI/api/Authentication/Authenticate",request,{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "IntegrationID":"1aa6a39b-5f54-4905-880a-a52733fd6105"
            }
        })
        return {
            Token:data.token,
            RefreshToken:data.refreshToken,
            IsSuccess:data.isSuccess
        }
    }
}