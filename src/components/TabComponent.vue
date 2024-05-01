<script>
export default {
    name: "tab-component",
    props: {
        selectPaymentStatus: Function,
        makePayment: Function
    },
    data() {
        return {
            activeTab: "All",
            tabs:[
                { name: "All", color: "#111827" },
                { name: "Paid", color: "#8C62FF" },
                { name: "Unpaid", color: "#D4A701" },
                { name: "Overdue", color: "#FD6A6A" },
            ],
        }
    },
    methods: {
        handleTabSelect(item) {
            this.activeTab = item.name;
            this.selectPaymentStatus(item);
        }
    }
}
</script>
<template>
    <div class="h-[56px] mt-[40px] mb-[24px] flex justify-between items-center">
        <div class="flex space-x-[24px]">
            <p @click="handleTabSelect(tab)" :key="tab.name" v-for="tab in tabs" :class="activeTab === tab.name && 'text-[#0CAF60] border-b-2 border-[#0CAF60]'" class="text-[15px] text-[#797B89] font-medium cursor-pointer px-2 leading-6 capitalize">{{tab.name}}</p>
        </div>
        <button @click="makePayment()" class="bg-[#0CAF60] font-bold text-base text-[#FFFFFF] px-[90px] py-[16px] rounded-xl">Pay Dues</button>
    </div>
</template>