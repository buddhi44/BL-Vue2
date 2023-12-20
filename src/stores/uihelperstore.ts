import { defineStore } from 'pinia';
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';

export const uiHelperStore = defineStore({
    id: 'mainFormDefinitions',
    state: () => ({
        mainFormDefinitions: {} as BLUIBuilder
    }),
    actions: {

    }
})