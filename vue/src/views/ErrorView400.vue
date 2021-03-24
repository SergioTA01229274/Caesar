<template>
    <div class="ErrorView">
        <div class="footer content" id="compContainer"><error></error></div>
    </div>
</template>

<style lang="scss">
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
import Error from '../components/Error400.vue';
</script>