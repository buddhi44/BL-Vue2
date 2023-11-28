
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
  
  // companies.value= companystore.companies.map(x=>({
  //   CompanyKey:x.CompanyKey,
  //   CompanyName:x.CompanyName,
  //   CompanyCode:x.CompanyCode
  // }));

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
  <div class="company-form">
  <div class="justify-center align-center">
    
    <v-img
        class="mx-auto my-6"
        width="300"
        :aspect-ratio="1"
        :src="bl_logo"
      ></v-img>

    <form>

      <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Company</div>
        
        <v-autocomplete
              v-model="selectedCompany.companyName"
              :items="companies" 
              color="blue-grey-lighten-2"
              item-title="name"
              item-value="name"
              variant="outlined"
              clearable
            >

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item?.raw?.companyName"
                ></v-list-item>
              </template>
            </v-autocomplete>

      
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="onSelectCompany"
      >
        Continue ...
      </v-btn>
    </v-card>

    </Form>
    
  </div>
</div>
</template> 

<!-- <style>
.company-form{
  background-image:url(../../../assets/images/bg-001.jpg);
  background-repeat:no-repeat;
  background-size:cover;
  background-position:center;
  overflow:hidden;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width:100vw;
}
</style> -->

