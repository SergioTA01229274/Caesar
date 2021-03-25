<template>
    <div>
        <v-container id='container'>
            <div id="subContainer">
                <v-row>
                <v-text-field class = 'inputField' label='Username' hide-details = 'auto' filled rounded dense></v-text-field>
            </v-row>
            <v-row>
                <v-text-field class = 'inputField' label = 'Password' required type = 'password' filled rounded dense></v-text-field>
            </v-row>
            <v-row>
                <v-text-field class = 'inputField' label = 'Confirm Password' required type = 'password' filled rounded dense></v-text-field>
            </v-row>
            <v-row>
                <v-btn id = 'submitButton' @click="createUser()">
                    <label for="submitButtonFor" class = 'buttonLabel'>
                        Submit
                    </label>
                </v-btn>
            </v-row>
            </div>
        </v-container>
    </div>
</template>

<style scoped>
    .inputField {
        width:25rem;
        height: 4rem;
        font-size: 1.45rem;
        font-family: Roboto;
        margin-left: 1.5em;
        margin-right: 1.5rem;
        margin-bottom: 1rem;
    }
    #submitButton{
        width:7em;
        height: 3rem;
        font-family: Roboto;
        font-size: 1.45rem;
        font-weight: 500;
        background-color:#7983A6;
        color: #F2EEEE;
        margin-left:7.5em;
    }

    #container{
        background-color:#E5E5E5;
        height:22rem;
        width:30rem;
        box-shadow: 3px 5px #888888;
        justify-content: center;
    }
    #subContainer {
        margin-top: 2rem;
        justify-content: center;
    }
</style>

<script>
    export default {
        name:'signup',
        methods: {
            createUser(){
                this.$router.push({path: '/'});
            }
        }
    }
</script>