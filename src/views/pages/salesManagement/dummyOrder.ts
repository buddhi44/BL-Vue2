
import { ItemResponse } from "@/core/domain/Entities/Base/ItemResponse";
import { AccountResponse } from "@/core/domain/Entities/Base/accountResponse";
import { AddressResponse } from "@/core/domain/Entities/Base/addressResponse";
import { CodeBaseResponse } from "@/core/domain/Entities/Base/codeBaseReponse";
import { ProjectResponse } from "@/core/domain/Entities/Base/projectResponse";
import { OrderItem } from "@/core/domain/Entities/OrderItem";
import { BLOrder } from "@/core/domain/Entities/BLOrder";

var dummyBLOrder: BLOrder=new BLOrder();
export dummyBLOrder = {
    orderKey: 1,
    orderNumber: 'ORD001',
    isHold: false,
    orderDocumentNumber: 'DOC001',
    orderDate: new Date('2023-01-01'),
    orderFinishDate: new Date('2023-01-15'),
    deliveryDate: new Date('2023-02-01'),
    orderLocation: {
        codeKey: 101,
        codeName: 'Location-A',
        code: 'LOC-A',
        isDefault: true,
        comboType: ''
    },
    orderLocation2: {
        codeKey: 102,
        codeName: 'Location-B',
        code: 'LOC-B',
        isDefault: false,
        comboType: ''
    },
    orderPaymentTerm: {
        codeKey: 201,
        codeName: 'Net 30 Days',
        code: 'NET30',
        isDefault: true,
        comboType: ''
    },
    orderCustomer: {
        addressKey: 301,
        addressName: 'Customer-A',
        addressId: 'CUST-A',
        comboType: ''
    },
    orderRepAddress: {
        addressKey: 302,
        addressName: 'Representative-A',
        addressId: 'REP-A',
        comboType: ''
    },
    orderAccount: {
        accountKey: 401,
        accountCode: 'ACC001',
        accountName: 'Account-A',
    },
    orderType: {
        codeKey: 501,
        codeName: 'Type-A',
        code: 'TYPE-A',
        isDefault: true,
        comboType: ''
    },
    orderItems: [
       
        {
            addressKey: 305,
            analysisType1: {
                codeKey: 105,
                codeName: 'Analysis-Type-1-B',
                code: 'AT1-B',
                isDefault: true,
                comboType: ''

            },
            analysisType2: {
                codeKey: 106,
                codeName: 'Analysis-Type-2-B',
                code: 'AT2-B',
                isDefault: false,
                comboType: ''

            },
            availableQuantity: 8,
            availableStock: 4,
            baringCompany: {
                accountKey: 505,
                accountCode: 'BC004',
                accountName: 'Baring-Company-B',
            },
            baringCustomer: {
                accountKey: 506,
                accountCode: 'BC005',
                accountName: 'Baring-Customer-B',
            },
            baringPrinciple: {
                accountKey: 507,
                accountCode: 'BC006',
                accountName: 'Baring-Principle-B',
            },
            bussinessUnit: {
                codeKey: 602,
                codeName: 'Business-Unit-B',
                code: 'BU-B',
                isDefault: false,
                comboType: ''

            },
            companyAmount: 80,
            companyPrecentage: 4,
            customerAmount: 40,
            customerPrecentage: 2,
            description: 'OrderItem-Description-B',
            discount2Amount: 16,
            discount2Percentage: 2,
            discountAmount: 12,
            discountPercentage: 1,
            fromOrderDetailKey: 21,
            fromOrderDetKy: 22,
            headerDiscountAmount: 20,
            insurenceAmount: 25,
            insurencePrecentage: 3,
            isActive: 1,
            isApproved: 1,
            isDirty: false,
            isItemReturned: false,
            isPendingForIssue: false,
            isRateInclusiveTT1: false,
            isRateInclusiveTT2: false,
            isRateInclusiveTT3: false,
            isRateInclusiveTT4: false,
            isRateInclusiveTT5: false,
            isSupplimentary: 0,
            isTransfer: 0,
            isTransferConfirmed: 0,
            itemTaxType1: 1,
            itemTaxType1Per: 4,
            itemTaxType2: 2,
            itemTaxType2Per: 2,
            itemTaxType3: 3,
            itemTaxType3Per: 3,
            itemTaxType4: 4,
            itemTaxType4Per: 1,
            itemTaxType5: 5,
            itemTaxType5Per: 1,
            itemTaxType5Per2: 1,
            lineNetTotal: 160,
            lineNumber: 2,
            lineSubTotal: 144,
            lineTotal: 152,
            lineTotalWithoutDiscount: 136,
            objectKey: 702,
            orderDetailKey: 23,
            orderDetailsAccountKey1: 24,
            orderDetailsAccountKey2: 25,
            orderDetailsAccountKey3: 26,
            transactionItem: {
                itemKey: 802,
                itemCode: 'ITEM002',
                itemName: 'Item-B',
                isDefault: false,
                comboType:''
                
            },
            orderKey: 27,
            orderLineLocation: {
                codeKey: 903,
                codeName: 'Order-Line-Location-B',
                code: 'OLL-B',
                isDefault: true,
                comboType: ''

            },
            orderLineLocation2: {
                codeKey: 904,
                codeName: 'Order-Line-Location2-B',
                code: 'OLL2-B',
                isDefault: false,
                comboType: ''

            },
            orderLineProject: {
                projectKey: 1002,
                projectId: 'PROJ-B',
                projectName: 'Project-B',
            },
            orderType: {
                codeKey: 1102,
                codeName: 'Order-Type-B',
                code: 'OT-B',
                isDefault: true,
                comboType: ''

            },
            ownerAmount: 28,
            ownerPrecentage: 4,
            principleAmount: 32,
            principlePrecentage: 5,
            processDetailsKey: 28,
            rate: 45,
            referanceOrderDetKey: 29,
            remark: 'OrderItem-Remark-B',
            requestedQuantity: 12,
            requiredDate: new Date('2023-02-12'),
            resourceAddress: {
                addressKey: 306,
                addressName: 'Resource-Address-B',
                addressId: 'RADDR-B',
                comboType: ''

            },
            supplier: {
                accountKey: 508,
                accountCode: 'SUPP002',
                accountName: 'Supplier-B',
            },
            supplimentaryNumber: 'SUPP002',
            supplimentaryOrderKey: 30,
            transactionDiscountAmount: 8,
            transactionQuantity: 18,
            transactionRate: 22,
            transactionUnit: {
                unitName: 'Unit-B',
                unitKey: 1203,
                isDefault: false,
                comboType: ''

            },
            transferQuantity: 1,
            unit: {
                unitName: 'Unit-C',
                unitKey: 1204,
                isDefault: true,
                comboType:''
            },

        },
        // Add more order items as needed
    ],
    formObjectKey: 501,
    objectKey: 601,
    headerLevelDisountPrecentage: 10,
    bussinessUnit: {
        codeKey: 701,
        codeName: 'Business-Unit-A',
        code: 'BU-A',
        isDefault: true,
        comboType: ''

    },
    fromOrderKey: 2,
    isFromQuotation: false,
    description: 'Sample Description',
    orderApproveState: {
        codeKey: 801,
        codeName: 'Approved',
        code: 'APPROVED',
        isDefault: true,
        comboType: ''

    },
    orderPrefix: {
        codeKey: 901,
        codeName: 'Prefix-A',
        code: 'PREFIX-A',
        isDefault: false,
        comboType: ''

    },
    orderCategory1: {
        codeKey: 1001,
        codeName: 'Category-1-A',
        code: 'CAT1-A',
        isDefault: true,
        comboType: ''

    },
    orderCategory2: {
        codeKey: 1002,
        codeName: 'Category-2-A',
        code: 'CAT2-A',
        isDefault: false,
        comboType: ''

    },
    orderCategory3: {
        codeKey: 1003,
        codeName: 'Category-3-A',
        code: 'CAT3-A',
        isDefault: true,
        comboType: ''

    },
    orderStatus: {
        codeKey: 1101,
        codeName: 'Status-A',
        code: 'STATUS-A',
        isDefault: false,
        comboType: ''

    },
    orderControlCondition: {
        codeKey: 1201,
        codeName: 'Condition-A',
        code: 'CONDITION-A',
        isDefault:false,
        comboType: ''
    }


}

