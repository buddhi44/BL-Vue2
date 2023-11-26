
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import router from '@/router'
import { ref, reactive, onMounted } from 'vue';
import bl_logo from '../../../assets/bl360.png'
import { useCompanyStore } from '@/stores/companystore';
import { CompanySelectionModal } from '@/core/application/auth/company';

const companies = ref<CompanySelectionModal[]>([]);
var selectedCompany=ref<CompanySelectionModal>({ CompanyKey: 1, CompanyName: '-', CompanyCode: '-' }) 

const companystore=useCompanyStore()
onMounted(async () => {
  
  await useCompanyStore().getAll(); 
  companies.value= companystore.companies.map(x=>({
    CompanyKey:x.CompanyKey,
    CompanyName:x.CompanyName,
    CompanyCode:x.CompanyCode
  }));

  selectedCompany =ref(companies.value[0])
});

const onSelectCompany=()=>{
  companystore.updateSelectedCompany()
  
}
</script>

<template>
  
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
              v-model="selectedCompany.CompanyName"
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
                  :title="item?.raw?.CompanyName"
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

</template> 

