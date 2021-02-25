<template>
    <div class="error">
        <v-container fluid>
            <v-row>
                <div class="footer content" id="headerContainer">
                        <img src="@/assets/CaesarLogo.png" id="caesarLogo">
                        <span class="header">404 ERROR</span>
                        <br><span class="header">PAGE NOT FOUND</span>
                </div>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Error"
}
</script>

<style scoped>
    .header {
        font-family: Roboto;
        font-weight: 500;
        font-size: 5em;
        color: #000001;
        margin-top: 1em;
        text-align: center;
    }
    #caesarLogo {
        width: 15rem;
        height: 15rem;
        float: left;
        margin-left: 1em;
        margin-top: 1em;
    }
    #headerContainer {
        position: fixed;
        top: 12rem;
        left: 12rem;
    }
</style>