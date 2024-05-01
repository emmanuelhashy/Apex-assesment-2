<template>
    <div ref="dropdown4">
        <p @click="toggleMenu()" class="flex h-4 justify-center text-[#A0AEC0] items-center text-2xl">
            ...
        </p>
        <div v-if="showMenu" class="w-40 text-[#383A47] bg-white text-sm font-medium -left-20 z-50 p-2 top-6 absolute shadow-xl">
            <p @click="closeMenu" class="hover:bg-[#E7F7EF] rounded p-1.5">Edit</p>
            <p @click="closeMenu" class="hover:bg-[#E7F7EF] rounded p-1.5">View Profile</p>
            <p @click="closeMenu" class="hover:bg-[#E7F7EF] rounded p-1.5">Delete</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "dotted-menu",
    data() {
        return {
            showMenu: false,
        }
    },
    mounted() {
        document.body.addEventListener('click', this.handleDocumentClick);
    },
    unmounted() {
        // Remove event listener when component is destroyed
        document.body.removeEventListener('click', this.handleDocumentClick);
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        closeMenu() {
            this.showMenu = false;
        },
        handleDocumentClick(event) {
            // Check if clicked element is inside any dropdown
            const isInsideDropdown4 = this.$refs.dropdown4.contains(event.target);

            // Close all dropdowns if clicked element is not inside any dropdown
            if (!isInsideDropdown4) {
                this.showMenu = false;
            }
        },
    }
}
</script>