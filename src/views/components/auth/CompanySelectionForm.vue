<script setup lang="ts">
import { storeToRefs } from 'pinia';
import router from '@/router'
import { ref, reactive, onMounted } from 'vue';
import bl_logo from '../../../assets/images/bl360.png'
import { useCompanyStore } from '@/stores/companystore';
import { CompanySelectionModal } from '@/core/application/auth/company';

const companies  = ref<any[]>([]);
var selectedCompany=ref<any>({ val: {}, name: '-',code:'-' }) 

const companystore=useCompanyStore()
onMounted(async () => {
  
  await companystore.getAll(); 
  var companiesList=companystore.companies;
  var companiesTemp:any[] = [];
    for(var c of companiesList){
        companiesTemp = companiesTemp.concat({
                    val:c,
                    name:c.companyName,
                    code:c.companyCode
                })
    }
    companies.value=companiesTemp;
    
  selectedCompany =ref(companies.value[1])
  console.log("default company",selectedCompany)
});

const onSelectCompany=()=>{

  const company:CompanySelectionModal={
    CompanyKey:selectedCompany.value.val.companyKey,
    CompanyCode:selectedCompany.value.val.companyCode,
    CompanyName:selectedCompany.value.val.companyName
  }

  console.log(selectedCompany)
  companystore.updateSelectedCompany(company)
  
}
</script>


<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Blue Lotus 360</span>
        </div>
    </div>
    <div>
        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Company</v-label>
                <v-autocomplete
                    v-model=selectedCompany.val
                    :items="companies" 
                    color="primary"
                    item-value="val" 
                    item-title="name"
                    variant="outlined"
                    clearable>
                </v-autocomplete>  
            </v-col>
            
            
            <v-col cols="12">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" flat @click="onSelectCompany">Continue ...</v-btn>
            </v-col>
        </v-row>
    </div>
</template>


