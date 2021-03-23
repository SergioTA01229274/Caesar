<template>
    <div id="receiverBar">
        <public-menu>{{this.tag}}</public-menu>
    </div>
</template>

<script>
import publicMenu from './publicMenu.vue'


export default {
    props: ['tag'],
  components: { publicMenu },
    name: "ToolbarUser"
}


</script>


<style scoped>
    #receiverBar {
        background-color: #7983A6 !important;
    }
    
</style>