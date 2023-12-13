export interface BLUIElement {
    _internalElementName:string,
    elementCaption:string,
    elementName:string,
    elementID:string,
    ourCode:string,
    elementType:string,
    defaultAccessPath:string,
    defaultValue:string,
    isServerFiltering:boolean,
    onClickAction:string,
    elementKey:string,
    parentKey:string,
    width:number,
    isVisible:boolean,
    isMust:boolean,
    isEnable:boolean,
    children:BLUIElement[],
    cssClass:string,
    parentCssClass:string,
    urlAction:string,
    urlController:string,
    iconCss:string,
    enterKeyAction:string,
    isDebugMode:boolean,
    format: string
    readController: string
    readAction: string
    createController: string
    createAction: string
    updateController: string
    updateAction: string
    deleteController: string
    deleteAction: string
    xs: number
    sm: number
    md: number
    lg: number
    xlg: number
    isCd01: number
    isCd02: number
    isCd03: number
    isCd04: number
    isCd05: number
    isCd06: number
    isCd07: number
    isCd08: number
    isCd09: number
    isCd10: number
    isCd40: number
    isCd102: number
    isCd150: number
    reportName: string
    reportPath: string
    nextObjKy: number
    nextObjName: string
    nextObjType: string
    onBeforeComboLoad: string
    onAfterComboLoad: string
    isMustElements: string[]
}