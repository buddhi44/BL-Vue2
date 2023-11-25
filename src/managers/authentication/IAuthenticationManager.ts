export interface IAuthenticationManager{
    authenticate(request:TokenRequest):Promise<TokenResponse>
}