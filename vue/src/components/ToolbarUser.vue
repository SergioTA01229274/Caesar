<template>
    <v-system-bar dark color=#7983A6 height="60" style="margin-top: 1em">
        <span id="receiver">Mr. Blue</span>
        <v-spacer></v-spacer>
        <v-icon></v-icon>
    </v-system-bar>
</template>

<script>

export default {
    name: "ToolbarUser"
}


</script>


<style scoped>
    #receiver {
        font-size: 2rem;
        color: #F2EEEE;
        padding: 0.4em;
    }
    #img {
        height: 1em;
        width: 1em;
    }
    #vimg {
        height: 3em;
        width: 3em;
    }
</style>