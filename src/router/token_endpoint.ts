import {baseUrl} from './base_end_point'

export  class TokenEndPoint
{
    static AuthenticateURL: string = baseUrl+"Authentication/Authenticate";
    static CompanyListingEndPoint: string = baseUrl+ "Authentication/GetUserCompanies";
    static CompanySelectedEndPoint: string = baseUrl+"Authentication/UpdateSelectedCompany";
}