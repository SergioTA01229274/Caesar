<template>
    <div class="ErrorView">
        <div class="footer content" id="compContainer"><error></error></div>
    </div>
</template>

<style scoped>
    #compContainer {
        position: fixed !important;
        left: 22.5rem;
    }
</style>

<script>
export default {
    name: "ErrorView",
    components: {
        Error
    }
}
import Error from '../components/Error.vue';
</script>