type TokenRequest = {
    UserName : string,
    Password : string
}

type TokenResponse = {
    Token : string,
    RefreshToken : string,
    IsSuccess : boolean
}