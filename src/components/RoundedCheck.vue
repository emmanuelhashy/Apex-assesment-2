<template>
    <div @click="checkIfPaid(item.id)"
        class="w-6 h-6 border flex justify-center items-center cursor-pointer rounded-full p-1">
        <p :class="checked && 'bg-green-600'" class="rounded-full w-4 h-4"></p>
    </div>
</template>
<script>
export default {
    name: "check-component",
    props: {
        item: Object,
        storeID: Function,
        deleteID: Function,
        resetSelect: Boolean,
        handleSelectReset: Function,
    },
    data() {
        return {
            checked: false
        }
    },
    watch: {
        resetSelect() {
            if (this.resetSelect) {
                this.checked = false
            }
        }
    },
    methods: {
        checkIfPaid(id) {
            if (this.item.payment_made_at) {
                const instance = this.$toast.open({
                    message: "Transaction Already Paid",
                    type: "warning",
                    position: "top-right",
                });
                const closeToast = () => instance.dismiss();
                const timeout = setTimeout(closeToast, 5000);
                clearTimeout(timeout);
            } else {
                this.toggleCheck(id)
            }
        },
        toggleCheck(id) {
            this.checked = !this.checked;
            this.handleSelectReset()
            if (this.checked) {
                this.storeID(id)
            } else {
                this.deleteID(id)
            }
        }
    }
}
</script>
<style scoped>
.toast__text {
    color: white !important;
}
</style>