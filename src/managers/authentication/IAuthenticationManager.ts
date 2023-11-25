export interface IAuthenticationManager{
    authenticate(request:TokenRequest):TokenResponse
}