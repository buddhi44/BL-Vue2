<script setup lang="ts">
import { storeToRefs } from 'pinia';
import router from '@/router'
import { ref, reactive, onMounted } from 'vue';
import bl_logo from '../../../assets/images/bl360.png'
import { useCompanyStore } from '@/stores/companystore';
import { CompanySelectionModal } from '@/core/application/auth/company';

const companies  = ref<any[]>([]);
var selectedCompany=ref<any>({ CompanyKey: 1, CompanyName: '-', CompanyCode: '-' }) 

const companystore=useCompanyStore()
onMounted(async () => {
  
  await companystore.getAll(); 
  companies.value=companystore.companies ;

  selectedCompany =ref(companies.value[1])
  console.log(selectedCompany.value)
});

const onSelectCompany=()=>{

  const company:CompanySelectionModal={
    CompanyKey:selectedCompany.value.companyKey,
    CompanyCode:selectedCompany.value.companyCode,
    CompanyName:selectedCompany.value.companyName
  }
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
                    v-model="selectedCompany.companyName"
                    :items="companies" 
                    color="primary"
                    item-title="name"
                    item-value="name"
                    variant="outlined"
                    clearable
                    >

                    <template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :key="item?.raw?.companyKey"
                          :title="item?.raw?.companyName"
                        ></v-list-item>
                    </template>
                </v-autocomplete>
            </v-col>
            
            
            <v-col cols="12">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" flat @click="onSelectCompany">Continue ...</v-btn>
            </v-col>
        </v-row>
    </div>
</template>


