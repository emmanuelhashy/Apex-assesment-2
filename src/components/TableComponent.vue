<script>
import FilterIcon from "./icons/FilterIcon.vue";
import ArrowDownIcon from "./icons/ArrowDownIcon.vue";
import PaginationComponent from "./PaginationComponent.vue";
import LoadSpinner from "./LoadSpinner.vue";
import DottedMenu from "./DottedMenu.vue";
import RoundedCheck from "./RoundedCheck.vue";

export default {
    name: "table-component",
    components: { FilterIcon, ArrowDownIcon, PaginationComponent, LoadSpinner, DottedMenu, RoundedCheck },
    props: {
        transactions: Array,
        loading: Boolean,
        fetchTransactions: Function,
        pageSize: Number,
        currentPage: Number,
        limit: Number,
        paymentStatus: String,
        handlePageChange: Function,
        selectLimitOption: Function,
        selectPaymentStatus: Function,
        storeID: Function,
        deleteID: Function,
        resetSelect: Boolean,
        handleSelectReset: Function,
    },
    data() {
        return {
            name: "",
            amount: 0,
            showFilter: true,
            statusList: [
                { name: "All", color: "#111827" },
                { name: "Paid", color: "#8C62FF" },
                { name: "Unpaid", color: "#D4A701" },
                { name: "Overdue", color: "#FD6A6A" },
            ],
            userStatus: "All",
            userStatusList: [
                { name: "All", color: "#111827" },
                { name: "Active", color: "#0CAF60" },
                { name: "Inactive", color: "#FE964A" },
            ],
            lowerLimit: 6,
            limitOptions: [6, 12, 18, 24, 32, 48],
            showUserStatusMenu: false,
            showLimitOptions: false,
            showPaymentStatusMenu: false,
        };
    },
    computed: {
        filteredTransactions() {
            return this.transactions.filter(obj => (obj.amount === this.amount) || (obj.user.name.toLowerCase().includes(this.name.toLowerCase())));
        },
    },
    mounted() {
        // this.fetchTransactions();
        document.body.addEventListener('click', this.handleDocumentClick);
    },
    unmounted() {
        document.body.removeEventListener('click', this.handleDocumentClick);
    },
    methods: {
        handleDocumentClick(event) {
            // Check if clicked element is inside any dropdown
            const isInsideDropdown1 = this.$refs.dropdown1.contains(event.target);
            const isInsideDropdown2 = this.$refs.dropdown2.contains(event.target);
            const isInsideDropdown3 = this.$refs.dropdown3.contains(event.target);

            // Close all dropdowns if clicked element is not inside any dropdown
            if (!isInsideDropdown1 && !isInsideDropdown2 && !isInsideDropdown3) {
                this.showLimitOptions = false;
                this.showPaymentStatusMenu = false;
                this.showUserStatusMenu = false;
            }
        },
        getCurrencySymbol(currency) {
            const currencySymbol = {
                "USD": "$"
            }
            return currencySymbol[currency]
        },
        formatDateTime(dateTimeString) {
            const date = new Date(dateTimeString);
            const options = {
                day: "2-digit",
                month: "short",
                year: "numeric",
            };
            return date.toLocaleString("en-US", options);
        },
        compareDates(date) {
            const firstDate = new Date(Date.now());
            const secondDate = new Date(date);
            if (firstDate <= secondDate) {
                return "Unpaid"
            }
            return "Overdue"
        },
        toggleUserStatus() {
            this.showUserStatusMenu = !this.showUserStatusMenu;
            this.showLimitOptions = false;
            this.showPaymentStatusMenu = false;
        },
        toggleFilter() {
            this.showFilter = !this.showFilter;
        },
        togglePaymentStatus() {
            this.showPaymentStatusMenu = !this.showPaymentStatusMenu;
            this.showLimitOptions = false;
            this.showUserStatusMenu = false;
        },
        toggleLimitOptions() {
            this.showLimitOptions = !this.showLimitOptions;
            this.showPaymentStatusMenu = false;
            this.showUserStatusMenu = false;
        },
        selectUserStatus(option) {
            this.userStatus = option.name;
        },
    },
};
</script>
<template>
    <div class="bg-white rounded-2xl pt-[24px]">
        <div class="flex justify-end px-[29px]">
            <button @click="toggleFilter()"
                class="bg-[#FAFAFA] flex space-x-2 font-medium rounded-xl p-4 text-[#0CAF60]">
                <FilterIcon />
                <span>Filters</span>
            </button>
        </div>
        <!-- FILTER COMPONENT -->
        <div v-if="showFilter" class="flex space-x-[16px] px-[29px]">
            <div class="w-full">
                <p class="text-[#111827] text-base font-bold mb-2 capitalize">Name</p>
                <input placeholder="name" v-model="name"
                    class="h-[56px] w-full bg-[#FAFAFA] px-4 outline-none rounded-xl placeholder:text-[#A0AEC0] text-[#111216] text-base font-medium" />
            </div>
            <div class="w-full">
                <p class="text-[#111827] text-base font-bold mb-2 capitalize">Amount</p>
                <input type="number" placeholder="amount" v-model="amount"
                    class="h-[56px] w-full bg-[#FAFAFA] px-4 outline-none rounded-xl placeholder:text-[#A0AEC0] text-[#111216] text-base font-medium" />
            </div>
            <div class="w-full">
                <p class="text-[#111827] text-base font-bold mb-2 capitalize">
                    User's status
                </p>
                <div ref="dropdown1" class="aselect" :data-value="userStatus" :data-list="userStatusList">
                    <div class="selector h-[56px] rounded-xl w-full px-4 bg-[#FAFAFA]" @click="toggleUserStatus()">
                        <div class="label text-[#111216] text-base font-medium">
                            <span>{{ userStatus }}</span>
                        </div>
                        <div class="arrow" :class="{ expanded: showUserStatusMenu }">
                            <ArrowDownIcon />
                        </div>
                        <div :class="{ hidden: !showUserStatusMenu, showUserStatusMenu }">
                            <ul class="p-2">
                                <li :key="item.color" :style="{ color: item.color }"
                                    class="p-4 font-medium rounded-xl flex items-center"
                                    :class="{ current: item.name === userStatus }" v-for="item in userStatusList"
                                    @click="selectUserStatus(item)">
                                    <p class="w-2 h-2 mr-2 bg-red-700 rounded-full"
                                        :style="{ backgroundColor: item.color }"></p>
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <p class="text-[#111827] text-base font-bold mb-2 capitalize">
                    Payment status
                </p>
                <div ref="dropdown2" class="aselect" :data-value="paymentStatus" :data-list="statusList">
                    <div class="selector h-[56px] rounded-xl w-full px-4 bg-[#FAFAFA]"
                        @click.stop="togglePaymentStatus()">
                        <div class="label text-[#111216] text-base font-medium">
                            <span>{{ paymentStatus }}</span>
                        </div>
                        <div class="arrow" :class="{ expanded: showPaymentStatusMenu }">
                            <ArrowDownIcon />
                        </div>
                        <div :class="{ hidden: !showPaymentStatusMenu, showPaymentStatusMenu }">
                            <ul class="p-2">
                                <li :key="item.color" :style="{ color: item.color }"
                                    class="p-4 font-medium rounded-xl flex items-center"
                                    :class="{ current: item.name === paymentStatus }" v-for="item in statusList"
                                    @click="selectPaymentStatus(item)">
                                    <p class="w-2 h-2 mr-2 bg-red-700 rounded-full"
                                        :style="{ backgroundColor: item.color }"></p>
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="overflow-auto rounded-lg">
            <div v-if="loading" class="flex h-80 justify-center items-center">
                <LoadSpinner />
            </div>
            <div v-else-if="filteredTransactions.length < 1" class="flex h-80 justify-center items-center">
                <p>No Data</p>
            </div>
            <table v-else class="w-[80rem] xl:w-full mt-12">
                <thead class="border-y text-[#718096] border-[#EEEFF2]">
                    <tr class="text-left">
                        <th class="py-6 w-2"></th>
                        <th class="py-6 w-20 font-medium">Name</th>
                        <th class="py-6 w-40 font-medium">User Status</th>
                        <th class="py-6 w-40 font-medium">Payment Status</th>
                        <th class="py-6 w-20 font-medium">Amount</th>
                        <th class="py-6 w-8"></th>
                    </tr>
                </thead>
                <tbody class="text-left">
                    <tr v-for="item in filteredTransactions" :key="item.id" class="border-y border-[#EEEFF2]">
                        <td class="py-6 w-8 pl-8">
                            <RoundedCheck :item="item" :storeID="storeID" :deleteID="deleteID" :resetSelect="resetSelect" :handleSelectReset="handleSelectReset"/>
                        </td>
                        <td class="py-6 w-20">
                            <p class="text-[#111827] font-semibold">
                                {{ item.user.name }}
                            </p>
                            <p class="text-[#88888A] font-medium">{{ item.user.email }}</p>
                        </td>
                        <td class="py-6 w-20">
                            <p class="w-20 h-8 flex justify-center items-center space-x-1 rounded-lg" :class="item.user.status === 'active'
        ? 'bg-[#E7F7EF]'
        : 'bg-[#FFF0E6]'
        ">
                                <span class="w-2 h-2 rounded-full block" :class="item.user.status === 'active'
        ? 'bg-[#0CAF60]'
        : 'bg-[#FE964A]'
        "></span>
                                <span class="capitalize block" :class="item.user.status === 'active'
        ? 'text-[#0CAF60]'
        : 'text-[#FE964A]'
        ">{{ item.user.status }}</span>
                            </p>
                            <p class="text-[#383A47] font-medium mt-2 text-base">
                                Last Login: {{ formatDateTime(item.user.last_login_at) }}
                            </p>
                        </td>
                        <td class="py-6 w-20">
                            <p class="w-20 h-8 flex justify-center items-center space-x-1 rounded-lg"
                                :class="item.payment_made_at !== null ? 'bg-[#F4F0FF]' : compareDates(item.payment_expected_at) === 'Unpaid' ? 'bg-[#d4a60123]' : compareDates(item.payment_expected_at) === 'Overdue' ? 'bg-[#fd6a6a24]' : null">
                                <span class="w-2 h-2 rounded-full block"
                                    :class="item.payment_made_at !== null ? 'bg-[#8C62FF]' : compareDates(item.payment_expected_at) === 'Unpaid' ? 'bg-[#D4A701]' : compareDates(item.payment_expected_at) === 'Overdue' ? 'bg-[#FD6A6A]' : null"></span>
                                <span class="block"
                                    :class="item.payment_made_at !== null ? 'text-[#8C62FF]' : compareDates(item.payment_expected_at) === 'Unpaid' ? 'text-[#D4A701]' : compareDates(item.payment_expected_at) === 'Overdue' ? 'text-[#FD6A6A]' : null">
                                    {{ item.payment_made_at !== null ? 'Paid' : compareDates(item.payment_expected_at)
                                    }}
                                </span>
                            </p>
                            <p class="text-[#383A47] font-medium mt-2 text-base">
                                {{
        item.payment_made_at !== null ? `Paid on:
                                ${formatDateTime(item.payment_made_at)}` : compareDates(item.payment_expected_at) ===
            'Unpaid' ? `Dues on: ${formatDateTime(item.payment_expected_at)}` :
            compareDates(item.payment_expected_at) === 'Overdue' ? `Was due on:
                                ${formatDateTime(item.payment_expected_at)}` : null }}
                            </p>
                        </td>
                        <td class="py-6 w-20">
                            <p class="text-[#111827] font-semibold">{{ getCurrencySymbol(item.currency) }}{{ item.amount
                                }}
                            </p>
                            <p class="text-[#88888A] font-medium">{{ item.currency }}</p>
                        </td>
                        <td class="py-6 cursor-pointer w-8">
                            <div class="relative">
                                <DottedMenu />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- PAGINATION -->
            <div class="flex items-center justify-between border-gray-200 bg-white px-7 py-8 sm:px-6">
                <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div class="flex items-center">
                        <p class="text-sm mr-4 text-[#718096] text-nowrap">Show result:</p>
                        <div class="w-[68px]">
                            <div ref="dropdown3" class="aselect" :data-value="limit" :data-list="limitOptions">
                                <div class="selector h-[38px] rounded-lg w-full px-4 bg-[#FAFAFA]"
                                    @click="toggleLimitOptions()">
                                    <div id="limit-input" class="label text-[#111216] text-base font-medium">
                                        <span class="block absolute -top-1">{{ limit }}</span>
                                    </div>
                                    <div class="arrow" :class="{ expanded: showLimitOptions }">
                                        <ArrowDownIcon />
                                    </div>
                                    <div class="bg-green-700" :class="{
        hidden: !showLimitOptions,
        showLimitOptions,
    }">
                                        <ul :style="{ top: '-310px' }" id="limit-menu" class="p-2">
                                            <li :key="item" :style="{ color: item }"
                                                class="p-4 font-medium rounded-xl flex items-center"
                                                :class="{ current: item === limit }" v-for="item in limitOptions"
                                                @click="selectLimitOption(item)">
                                                {{ item }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="transactions.length >= lowerLimit">
                        <PaginationComponent :total-items="pageSize" :current-page="currentPage" :per-page="limit"
                            @page-changed="handlePageChange" :go-button="false" styled="centered" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.aselect {
    .selector {
        position: relative;
        z-index: 1;

        .label {
            position: absolute;
            left: 16px;
            top: 30%;
        }

        .arrow {
            position: absolute;
            right: 16px;
            top: 43%;
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
        }

        .expanded {
            transform: rotateZ(180deg) translateY(2px);
        }
    }

    ul {
        width: 100%;
        list-style-type: none;
        margin: 0;
        font-size: 16px;
        border-radius: 12px;
        position: absolute;
        left: 0px;
        top: 60px;
        z-index: 1;
        background: #fff;
        box-shadow: -8px 11px 23px -5px rgba(0, 0, 0, 0.44);
        -webkit-box-shadow: -8px 11px 23px -5px rgba(0, 0, 0, 0.44);
        -moz-box-shadow: -8px 11px 23px -5px rgba(0, 0, 0, 0.44);
    }

    li {
        padding: 12px;
        color: #666;

        &:hover {
            background: #f9fafb;
        }
    }

    .hidden {
        visibility: hidden;
    }

    .visible {
        visibility: visible;
    }
}
</style>
