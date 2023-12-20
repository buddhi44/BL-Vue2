import baseUrl from './base_end_point'

export  class TokenEndPoint
{
    static AuthenticateURL: string = baseUrl()+"Authentication/Authenticate";
    static CompanyListingEndPoint: string = baseUrl()+ "Authentication/GetUserCompanies";
    static CompanySelectedEndPoint: string = baseUrl()+"Authentication/UpdateSelectedCompany";
    static FormDefinitionUrl : string = baseUrl() + "Object/FetchObjects";
    static SideMenuURL : string = baseUrl() + "Object/FetchSideMenu";
    static GetItemRateAndStockEndpoint = baseUrl() + "Item/getItemRateAndStockPOS";
}