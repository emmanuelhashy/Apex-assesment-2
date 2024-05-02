<script>
import TableComponent from "./components/TableComponent.vue";
import NavBar from "./components/NavBar.vue";
import TabComponent from "./components/TabComponent.vue";
import axios from "axios";

export default {
  name: "app-component",
  components: { TableComponent, NavBar, TabComponent },
  data() {
    return {
      loading: false,
      processing: false,
      resetSelect: false,
      transactions: [],
      pageSize: 0,
      currentPage: 1,
      limit: 6,
      paymentStatus: "All",
      store: [],
    };
  },
  computed: {
    queryParams() {
      return `?${
        this.currentPage ? `&page=${this.currentPage}` : `&page=${1}`
      }${this.limit ? `&per_page=${this.limit}` : `&per_page=${6}`}${
        this.paymentStatus ? `&state=${this.paymentStatus}` : `&state=all`
      }`;
    },
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      this.loading = true;
      axios
        .get(
          `https://apex-payments-eca4dc83534e.herokuapp.com/api/transactions${this.queryParams}`
        )
        .then((response) => {
          this.transactions = response.data.data;
          this.pageSize = response.data.total;
        })
        .catch((err) => {
          const instance = this.$toast.open({
            message: err,
            type: "error",
            position: "top-right",
          });
          const closeToast = () => instance.dismiss();
          const timeout = setTimeout(closeToast, 5000);
          clearTimeout(timeout);
        })
        .finally(() => (this.loading = false));
    },
    selectLimitOption(option) {
      this.limit = option;
      this.fetchTransactions();
    },
    handlePageChange(page) {
      this.currentPage = Number(page);
      this.fetchTransactions();
    },
    selectPaymentStatus(option) {
      this.paymentStatus = option.name;
      this.fetchTransactions();
    },
    storeID(id) {
      const idExist = this.store.find((item) => id === item);
      if (!idExist) {
        this.store.push(id);
      }
    },
    deleteID(id) {
      let index = this.store.indexOf(id);

      // If the item is found, remove it
      if (index !== -1) {
        this.store.splice(index, 1);
      }
    },
    handleSelectReset() {
      this.resetSelect = false;
    },
    makePayment() {
      if(this.store.length > 0) {
        //Make payment
        this.processing = true;
      axios
        .post(
          `https://apex-payments-eca4dc83534e.herokuapp.com/api/pay-dues`,{payments: this.store}
        )
        .then((response) => {
          console.log(response);
          const instance = this.$toast.open({
            message: "Payment Successful",
            type: "success",
            position: "top-right",
          });
          const closeToast = () => instance.dismiss();
          const timeout = setTimeout(closeToast, 5000);
          clearTimeout(timeout);
          this.store = []
          this.resetSelect = true
        })
        .catch((err) => {
          const instance = this.$toast.open({
            message: err,
            type: "error",
            position: "top-right",
          });
          const closeToast = () => instance.dismiss();
          const timeout = setTimeout(closeToast, 5000);
          clearTimeout(timeout);
        })
        .finally(() => (this.processing = false));
      } else {
        const instance = this.$toast.open({
            message: "Kindly Select a Transaction",
            type: "warning",
            position: "top-right",
            color: "white"
          });
          const closeToast = () => instance.dismiss();
          const timeout = setTimeout(closeToast, 5000);
          clearTimeout(timeout);
      }
    }
  },
};
</script>

<template>
  <NavBar />
  <main class="px-[28px] sm:px-[48px]">
    <TabComponent :selectPaymentStatus="selectPaymentStatus" :makePayment="makePayment"/>
    <TableComponent
      :transactions="transactions"
      :loading="loading"
      :fetchTransactions="fetchTransactions"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :limit="limit"
      :paymentStatus="paymentStatus"
      :selectLimitOption="selectLimitOption"
      :handlePageChange="handlePageChange"
      :selectPaymentStatus="selectPaymentStatus"
      :storeID="storeID"
      :deleteID="deleteID"
      :resetSelect="resetSelect" 
      :handleSelectReset="handleSelectReset"
    />
  </main>
</template>

<style scoped></style>
