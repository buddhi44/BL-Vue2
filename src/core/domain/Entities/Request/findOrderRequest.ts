import { AccountResponse } from "../Base/accountResponse";
import { AddressResponse } from "../Base/addressResponse";
import { CodeBaseResponse } from "../Base/codeBaseReponse";
import { ProjectResponse } from "../Base/projectResponse";

export class FindOrderRequest {

    OrderNo: string = '';
    objectKey: number = 1;
    documentNumber: string = '';
    FromDate: Date = new Date();
    ToDate: Date = new Date();
    Location: CodeBaseResponse = new CodeBaseResponse();
    project: ProjectResponse = new ProjectResponse();
    address: AddressResponse = new AddressResponse();
    Prefix: CodeBaseResponse = new CodeBaseResponse();
    account: AccountResponse = new AccountResponse();
    approveStatus: CodeBaseResponse = new CodeBaseResponse();
    OrderStatus: CodeBaseResponse = new CodeBaseResponse();
    repAddress: AddressResponse = new AddressResponse();
    NullableFromDateString: string = '';
    NullableToDateString:string='';


}
