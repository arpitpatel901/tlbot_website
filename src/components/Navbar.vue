<template>
    <div>
        <MenuBar :model="items" />
    </div>
</template>

<script>
import MenuBar from 'primevue/menubar';

export default {
    components: {
        MenuBar
    },
    data() {
        return {
            items: [
                // Define your menu items here
                {label: 'Home'},
                {label: 'About'},
                {label: 'Services'},
                {label: 'Contact'}
            ]
        }
    }
}
</script>

<style scoped>
    
</style>
