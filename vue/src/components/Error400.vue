<template>
    <div class="error">
        <v-container fluid>
            <v-row>
                <div class="footer content" id="headerContainer">
                        <img src="@/assets/CaesarLogo.png" id="caesarLogo">
                        <span class="header">400 ERROR</span>
                        <br><span class="header">BAD REQUEST</span>
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
        font-size: 5rem;
        color: #000001;
        margin-top: 1rem;
        text-align: center;
    }
    #caesarLogo {
        width: 17.5rem;
        height: 17.5rem;
        float: left;
    }
    #headerContainer {
        position: fixed;
        top: 12rem;
    }
</style>