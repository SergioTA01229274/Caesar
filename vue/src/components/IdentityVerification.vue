<template>
    <div id="app">
        <v-container id="container">
            <v-row>
                <v-col cols="12">
                    <v-file-input
                        multiple
                        label="File input"
                    ></v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn id="btn-upload">
                        Upload Files
                        <v-icon></v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "IdentityVerification"
}
</script>

<style scoped>
    #app {
        width: 24rem;
    }
    #container {
        padding-top: 1.75rem !important;
        background-color: #E5E5E5;
        height: 23rem;
        width: 30rem;
        box-shadow: 3px 5px #888888;
    }
    #btn-upload {
        background-color: #7983A6;
        color: #F2EEEE;
    }
</style>