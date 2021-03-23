<template>
    <div id="receiverBar">
        <public-menu v-bind:contactTag="contactLabel"></public-menu>
    </div>
    
</template>

<script>
import publicMenu from './publicMenu.vue';


export default {
    name: "ToolbarUser",
    props: ['tag'],
    data() {
        return {
            contactLabel: this.tag
        }
    },
    watch: {
        tag: {
            inmediate: true,
            handler(val, oldVal){
                this.contactLabel = val;
            }
        }
    },
    components: { publicMenu },
}


</script>


<style scoped>
    #receiverBar {
        background-color: #7983A6 !important;
    }
    
</style>