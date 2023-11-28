
export class MenuItem {
    MenuCaption: string;
    Menuname: string;
    ParentId: number;
    SubMenus: MenuItem[];
    URLController:string;
    URLAction:string;
    MenuId:number;
  
    constructor(menuCaption: string, menuname: string, parentId: number, 
                subMenus: MenuItem[] = [],urlController:string,
                urlAction:string,menuId:number) 
    {
        this.MenuCaption = menuCaption;
        this.Menuname = menuname;
        this.ParentId = parentId;
        this.SubMenus = subMenus;
        this.URLController=urlController;
        this.URLAction=urlAction;
        this.MenuId=menuId;
    }
  
    GetPathURL(): string 
    {
        
      if (this.URLController.trim() !== "" && this.URLAction.trim() !== "") 
      {
        return (this.URLController + "/" + this.URLAction).toLowerCase() + "?ElementKey=" + this.MenuId;
      }
    
      return "";
    
    }
  }