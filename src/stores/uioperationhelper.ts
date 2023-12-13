import { defineStore } from 'pinia';
import type {BLUIElement} from '@/core/domain/BLUIElement'

export const uiOperationHelperStore = defineStore({
    id: 'uihelpers',
    state: () => ({
        objectHelpers: {} as Record<string, BLUIElement> 
    }),
    actions: {
        create(key:string,value:BLUIElement) 
        {

        },

        
    }
});