<script lang="ts">
import {useRoute} from 'vue-router'
import {onMounted,watch,ref,provide, Ref} from 'vue'
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import {TokenEndPoint} from '@/router/token_endpoint'
import type ObjectFormRequest from '@/core/domain/ObjectFormRequest'
import UIBuilder from '@/views/components/uikit/UIBuilder.vue'
//import type {IOrder} from '@/core/domain/Entities/IOrder'
import {BLOrder} from '@/core/domain/Entities/BLOrder'
import {OrderItem} from '@/core/domain/Entities/OrderItem'
import {BLUIBuilder, BaseComponent, type IUIDefinition} from '@/core/domain/interfaces/IBLUIOperationHelper'
import { AddressResponse } from '@/core/domain/Entities/Base/addressResponse'
import { CodeBaseResponse } from '@/core/domain/Entities/Base/codeBaseReponse'
import { ItemResponse } from '@/core/domain/Entities/Base/ItemResponse'
import { UnitResponse } from '@/core/domain/Entities/Base/unitResponse'
import type {UnitComboRequest} from '@/core/domain/Entities/Base/comboRequest'
import { Component, Vue, toNative,Prop,Inject,Watch,Provide } from 'vue-facing-decorator'
import {RateAndStockReadRequest} from '@/core/domain/Entities/Request/rateRetrivalRequet'
import base_end_point from '@/router/base_end_point';
import {FindOrderRequest} from '@/core/domain/Entities/Request/findOrderRequest'
import {FindOrderResponse} from '@/core/domain/Entities/Response/findOrderRequest'
import UIRendere from '@/views/components/uikit/buildercomponents/UIRendere.vue'
import ItemCombo from '@/views/components/uikit/buildercomponents/combo/itemCombo.vue'

@Component({
    components:{UIBuilder,UIRendere}
})
class SalesOrder extends Vue{
    mainFormDefinitions=ref<BLUIBuilder>()
        popUpDefinition=ref<BLUIBuilder>()
    UIObjectKey =ref<number>(1)
    route = useRoute();
    controller = this.route.params.UrlController;
    action = this.route.params.UrlAction
    objectKey =this.route.query.ElementKey 
    uiContent =ref<any>()
    formElement =ref<any>()
    order =ref<BLOrder>(new BLOrder())
    controlVariables = ref<any>({
        ShiftPopUp:false
    })
    formRef =ref<any>();
    baseComponent=ref<BaseComponent>()
    findOrderRequest=ref<FindOrderRequest>();
    findOrderResponse=ref<FindOrderResponse[]>();
    dialog=ref<boolean>(false)

    async mounted(){
        this.order.value = new BLOrder();
        this.order.value.SelectedOrderItem=new OrderItem()
        this.mainFormDefinitions = new BLUIBuilder();
        this.order.ObjectKey = Number(this.objectKey);
        this.order.FormObjectKey = Number(this.objectKey);
        this.UIObjectKey= Number(this.objectKey);
        this.mainFormDefinitions.UIObjectKey = Number(this.objectKey);
        this.mainFormDefinitions.OwnerComponent = this;
        this.mainFormDefinitions.DataObject = this.order;
        this.mainFormDefinitions.ObjectRefs=new Array<IUIDefinition>();
        this.popUpDefinition = new BLUIBuilder();
        this.findOrderRequest = new FindOrderRequest();
        this.popUpDefinition.UIObjectKey=186580
        this.popUpDefinition.DataObject = this.findOrderRequest;
        this.popUpDefinition.OwnerComponent = this;
    }

    

    OnOrderNewClick=(elem: any)=>{
        
        // this.order=new BLOrder()
        // this.order.OrderItems=[]
        // this.mainFormDefinitions.DataObject=this.order;

        console.log("order",this.order)

    }
   
reset= ()=> {
    
}

async OnOrderFindClick(elem: any,callerUiObject: any){
    this.dialog=true;
}

async OnOrderSaveClick(elem: any,callerUiObject: any){
 
   this.order.FormObjectKey = Number(this.objectKey);
   var ord_res= await fetchWrapper.post(`${base_end_point()}order/createGenericOrder`,this.order)

   await this.LoadOrder({orderKey:ord_res.orderKey});

}

orderclick=()=>{

    console.log("ord",this.order.value)

}

async OnTransactionItemChange(item:ItemResponse){
    this.order.SelectedOrderItem.TransactionItem=item
    

    if (this.order.SelectedOrderItem) 
    {
            this.order.SelectedOrderItem.TransactionUnit = new UnitResponse();
            let rateAndStockRequest = new RateAndStockReadRequest();
            rateAndStockRequest.objectKey = this.UIObjectKey;
            rateAndStockRequest.addressKey = this.order.OrderCustomer.addressKey;
            rateAndStockRequest.locationKey = this.order.OrderLocation.codeKey;
            rateAndStockRequest.itemKey = this.order.SelectedOrderItem.TransactionItem.itemKey;
            rateAndStockRequest.payementTermKey = this.order.OrderPaymentTerm.codeKey;
            rateAndStockRequest.effectiveDate = this.order.OrderDate;
            rateAndStockRequest.conditionCode = 'OrdTyp';

            
            let result = await fetchWrapper.post(TokenEndPoint.GetItemRateAndStockEndpoint,rateAndStockRequest);
            
            console.log("rate-res",result)

            this.order.SelectedOrderItem.TransactionRate = result.rateResponse.transactionRate;
            this.order.SelectedOrderItem.Rate = result.rateResponse.rate;
            this.order.SelectedOrderItem.DiscountPercentage = result.rateResponse.discountPercentage;
            this.order.SelectedOrderItem.ItemTaxType1Per = result.rateResponse.itemTaxType1;
            this.order.SelectedOrderItem.ItemTaxType4Per = result.rateResponse.ItemTaxType4;

            //this.order.SelectedOrderItem.orderItem.ItemType = result.rateResponse.itemType;
            this.order.SelectedOrderItem.AvailableStock = result.stockResponse.stockAsAt;// Math.Max(ratesAndStock.StockResponse.StockAsAt, 0);
            this.order.SelectedOrderItem.IsItemLocked = result.stockResponse.isLocked;
            this.order.SelectedOrderItem.IsAlwMinusQty = result.stockResponse.isAlwMinusQty;
            this.order.SelectedOrderItem.MinSalesPrice = result.rateResponse.minimumSalesPrice;

            //console.log("ord-itm",this.order.SelectedOrderItem)

            //this.errorMessage.successMessage = `Item ${this.Order.currentItem.orderItem.itemName} has ${result.stockResponse.stockAsAt} Quantity`;
            if (this.order.SelectedOrderItem.TransactionItem ) {
                    let component = this.mainFormDefinitions?.getComponentByInternalName('TransactionUnit');
                   
                    if (component) {
                        component.Reload();
                    }
            }
    }

  
    
    
}

TransactionUnit_OnBeforeDataFetch(request: UnitComboRequest){
    
    if (this.order.SelectedOrderItem.TransactionItem ) 
    {
        
        request.itemKey = this.order.SelectedOrderItem.TransactionItem.itemKey;
    }
}

OnLineTransactionQuantityChanged(e:number){
    this.order.SelectedOrderItem.TransactionQuantity=e
}

OnRateChange(e:number){
    this.order.SelectedOrderItem.TransactionRate=e
}

OnAddItemButtonClick(elem: any,callerUiObject: any) {
   
    if (this.order.SelectedOrderItem) {
        this.order.SelectedOrderItem.LineNumber=this.order.OrderItems.length+1
        this.order.OrderItems.push(this.order.SelectedOrderItem);
       
        this.order.calculateBalances()
        this.order.SelectedOrderItem.LineDiscount=this.order.SelectedOrderItem.TransactionDiscountAmount ;
        this.order.SelectedOrderItem=new OrderItem()
    }
    else {
    }
}

async OnFindButtonClick(elem: any,callerUiObject: any)
{
    this.findOrderRequest.ObjectKey = 208286;

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    const formattedDate: string = this.findOrderRequest.FromDate.toLocaleDateString('en-GB', options);
    const formattedToDate: string = this.findOrderRequest.ToDate.toLocaleDateString('en-GB', options);
    this.findOrderRequest.NullableFromDateString = formattedDate;
    this.findOrderRequest.NullableToDateString = formattedToDate;

    console.log("find_req",this.findOrderRequest)
    var find_res= await fetchWrapper.post(`${base_end_point()}order/findOrders`,this.findOrderRequest)
    
    this.findOrderResponse=find_res
}

async OnOrderOpenClick(row:any){
    var find_res= await fetchWrapper.post(`${base_end_point()}order/OpenOrder`,{OrderKey:row.orderKey,ObjKy:208286})
    if(find_res){
        this.dialog=false
        this.order.copyFrom(find_res)
        this.mainFormDefinitions.DataObject=this.order;
    }
    
    
    
}

async LoadOrder(req:any){
    this.order.OrderItems=[]
    var find_res= await fetchWrapper.post(`${base_end_point()}order/OpenOrder`,{OrderKey:req.orderKey,ObjKy:Number(this.objectKey)})
    if(find_res){
        this.order.copyFrom(find_res)
        this.mainFormDefinitions.DataObject=this.order;
    } 
    
}
unwrapProxy(obj: any): any {
    
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const unwrappedObject: any = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    unwrappedObject[key] = this.unwrapProxy(value);
  }

  return unwrappedObject;
}



}


export default toNative(SalesOrder)
</script>

<template>
    <v-card elevation="10" class="pa-3" style="width:100%;height:calc(100vh - 140px);background-color: #dbeded;overflow-y:scroll">
        <div class="ma-2">
            
                        <v-toolbar
                            color="rgba(0, 0, 0, 0)"
                            theme="dark">
                                <v-toolbar-title class="text-h6"><strong>Special Order-{{ (order && order!=null && order.OrderNumber)? order.OrderNumber:"" }}</strong></v-toolbar-title>
                        </v-toolbar>
                <!-- <v-form> -->
                    <UIBuilder v-if="mainFormDefinitions!=undefined"  :Def="mainFormDefinitions" />
                <!-- </v-form> -->
                
        </div>
    </v-card>


    <v-dialog
      v-model="dialog"
      width="1000"
    >
      <v-card>
        <v-card-text>
            <UIRendere v-if="popUpDefinition!=undefined"  :Def="popUpDefinition" />

            <v-row>
                <v-col>
                    <v-card elevation="10" class="pb-2">
                        <v-card-item class="pa-6">
                            <div class="d-flex align-center justify-space-between">
                                <div>
                                    <h5 class="text-h5 mb-1 font-weight-semibold">Line Items</h5>
                                </div>
                            </div>
                            <v-table class="month-table">
                                <thead>
                                    <tr >
                                        <th class="text-subtitle-1 font-weight-bold">Order No</th>
                                        <th class="text-subtitle-1 font-weight-bold">Order Date</th>
                                        <th class="text-subtitle-1 font-weight-bold">Des</th>
                                        <th class="text-subtitle-1 font-weight-bold">Address</th>
                                        <th class="text-subtitle-1 font-weight-bold">Project</th>
                                        <th class="text-subtitle-1 font-weight-bold">Enterd By</th>
                                        <th class="text-subtitle-1 font-weight-bold">#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr v-if="findOrderResponse" v-for="row of findOrderResponse"  class="month-item">
                                       <td v-if="row" scope="col">{{row.orderNumber}}</td>
                                        <td v-if="row" scope="col">{{row.OrderDate}}</td>
                                        <td v-if="row" scope="col">{{row.description}}</td>
                                        <td v-if="row" scope="col">{{row.cusSupId}} - {{row.cusSupName}} </td>
                                        <td v-if="row" scope="col">-</td>
                                        <td v-if="row" scope="col">-</td>
                                        <td v-if="row" scope="col" class="right"><button type="button" class="btn btn-light btn-sm" v-on:click="OnOrderOpenClick(row)">Open</button></td>
                                        
                                    </tr>
                                
                                </tbody>
                            </v-table>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</template>

<!--
@Provide controls=this.controlVariables

@Provide('baseObject') 
baseObject= new BLOrder();

@Provide('GRID_DATA') 
GRID_DATA = this.order.value.OrderItems

@Provide('changeBaseObject') 
changeBaseObject = (mObject:BLOrder) => {
    this.order.value = mObject;
}
 @Provide('actionTriggers') 

actionTriggers =[
    {
        name:"OnInvoiceEditClick",
        action:()=>{
            this.controlVariables.ShiftPopUp = true;
         
        }
    },
    {
        name:"OnOrderNewClick",
        action:()=>{
            alert("new click")
            this.order.value =new BLOrder()
           
        }
    },
    {
        name:"OnOrderSaveClick",
        action:() => {

            this.save();
        }
    },
    {
        name:"ShowAddNewCustomer",
        action:() => {

           
            
        }
    },
    {
        name:"OnOrderPrintClick",
        action:() => {

         
            
        }
    },
    {
        name:"OnOrderFindClick",
        action:() => {
            
        }
    },
    {
        name:"OnOrderLocationChanged",
        action:(data:CodeBaseResponse)=>{
         this.order.value.OrderLocation=data
         console.log(this.order.value.OrderLocation)
        }
    },
    {
        name:"OnRouteComboChange",
        action:(data:any)=>{
        }
    },
    {
        name:"OnOrderCustomerChanged",
        action:(data:any)=>{
            this.order.value.OrderCustomer=data
        }
    },
    {
        name:"OnOrderRepChanged",
        action:(data:AddressResponse)=>{
            this.order.value.OrderRepAddress=data
            
        }
    },
    {
        name:"OnPayementTermChanged",
        action:(data:any)=>{
            this.order.value.OrderPaymentTerm=data
        }
    },
    {
        name:"OnPayementTermChanged",
        action:(data:CodeBaseResponse)=>{
            this.order.value.OrderPaymentTerm=data
        }
    },
    {
        name:"OnAdr2ComboChange",
        action:(data:AddressResponse)=>{
            this.order.value.Address2=data
        }
    },
    {
        name:"OnHeaderLevelDiscountClick",
        action:(data:number)=>{
            this.order.value.HeaderDiscountAmount=data
        }
    },
    {
        name:"OnTransactionItemChange",
        action:(data:ItemResponse)=>{
            this.order.value.SelectedOrderItem.TransactionItem=data
        }
    },
    {
        name:"OnLineTransactionUnitChange",
        action:(data:UnitResponse)=>{
            this.order.value.SelectedOrderItem.TransactionUnit=data
        }
    },
    {
        name:"TransactionUnit_OnBeforeDataFetch",
        action:(data:UnitComboRequest)=>{
            data.itemKey=this.order.value.SelectedOrderItem.TransactionItem.itemKey;
        }
    },
    {
        name:"OnLineTransactionQuantityChanged",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnLineDisPerChange",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnRateChange",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnIsTransferClick",
        action:(data:boolean)=>{
           
        }
    },
    {
        name:"OnIsConfirmedClick",
        action:(data:boolean)=>{
           
        }
    },
    {
        name:"TotalRateChange",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnItemDescription",
        action:(data:string)=>{
           
        }
    },
    {
        name:"RequiredQuantityChanged",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnAddItemButtonClick",
        action:() => {
            this.order.value.OrderItems = this.order.value.OrderItems.concat(new OrderItem())
        }
    },

    
] -->