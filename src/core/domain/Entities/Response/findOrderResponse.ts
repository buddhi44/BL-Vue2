import { AccountResponse } from "../Base/accountResponse"
import { CodeBaseResponse } from "../Base/codeBaseReponse"

export interface FindOrderResponse {
    OrderKey: number;
    orderDate: string;
    InsertDate: string;
    Prefix: string;
    OrderNumber: string;
    DocumentNumber: string;
    YourReference: string;
    Description: string;
    CusSupId: string;
    CusSupName: string;
    ProjectKey: number;
    ProjectName: any;
    ApproveState: CodeBaseResponse;
    Account: AccountResponse;
    RequestingObjectKey: number;
    PreviewURL: any;
    EntUsrKy: number;
    IsActive: number;
    remark: string;
    approveReason: any;
    orderCategory1: CodeBaseResponse;
    orderCategory2: CodeBaseResponse;
    OrderStatus: CodeBaseResponse;
   
}