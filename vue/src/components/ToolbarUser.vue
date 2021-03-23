<template>
    <div id="receiverBar">
        <h4 id="receiver">{{this.tag}}</h4>
    </div>
</template>

<script>

export default {
    name: "ToolbarUser",
    props: ['tag']
}


</script>


<style scoped>
    #receiver {
        text-align: left;
        margin-left: 0.5em;
        font-size: 2rem;
        font-weight: 500;
        color: #F2EEEE;
    }

    #receiverBar {
        background-color: #7983A6 !important;
    }
    
</style>