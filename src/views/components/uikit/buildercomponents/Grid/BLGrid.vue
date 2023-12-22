<script lang="ts">
import { ref } from 'vue';
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { OrderItem } from '@/core/domain/Entities/OrderItem';
import { PropHelper } from '@/helper/propertyHelper';


@Component
class blGrid extends Vue {
    @Prop()
    public UiElement!:any
    @Prop()
    public Def!:BLUIBuilder

    gridDefinition= ref<any>();
    lineItems=ref<OrderItem[]>();
    productPerformance: any;

    mounted(){

            if (typeof this.Def.DataObject['OrderItems'] == 'object') {
                this.lineItems = this.Def.DataObject['OrderItems'] as OrderItem[];
            }
        

    }

    @Watch("Def.DataObject", { immediate: true })

    propertyWatcher(newValue: any, oldValue: any) {
        this.lineItems = this.Def.DataObject['OrderItems'] as OrderItem[];
    }

    getProperty(lineItem: OrderItem, column: any) {

      let val = PropHelper.getPropertyValue(lineItem, column.defaultAccessPath);

      if (val) {
          if (typeof val == 'number') {
              return val.toFixed(2);
          }
          return val;
      }
      return '0';
    }

}

export default toNative(blGrid)
</script>
<template>
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
                    <th class="text-subtitle-1 font-weight-bold" v-for=" h of UiElement.children.filter((x:any)=>x.isVisible)">{{h.elementCaption}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="lineItems" v-for="item of lineItems"  class="month-item">
                    <td v-if="item" v-for="col of UiElement.children.filter((x:any)=>x.isVisible)">
                        <span v-if="col.elementID==='CommandColumn'" class="d-inline-flex">
                            <v-btn class="mdi mdi-pencil"></v-btn>
                            <v-btn class="mdi mdi-close-circle-outline"></v-btn>
                        </span>
                        <label v-else class="text-15 font-weight-medium">{{getProperty(item,col)}}</label>
                    </td>
                    
                </tr>
              
            </tbody>
        </v-table>
        </v-card-item>
    </v-card>
</template>

<style>
    .month-table tr th:nth-child(2){
        width:100px;
    }
</style>