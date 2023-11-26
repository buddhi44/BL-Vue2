export class CompanySelectionModal {
    CompanyKey: number = 1;
    CompanyName: string = "";
    CompanyCode:string="";
    constructor(companyKey?: number, companyName?: string,companyCode?: string) {
      if (companyKey !== undefined) {
        this.CompanyKey = companyKey;
      }
      if (companyName !== undefined) {
        this.CompanyName = companyName;
      }
      if (companyCode !== undefined) {
        this.CompanyCode = companyCode;
      }
    }
  }