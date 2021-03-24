<template>
    <div id = 'app'>
        <v-container id = 'container'>
            <v-row>
                <v-col cols = '10'>
                    <v-text-field class = 'inputField' label = 'Username' hide-details = 'auto' filled rounded dense></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols = '10'>
                    <v-text-field class = 'inputField' label = 'Password' required type = 'password' filled rounded dense></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols = '10'>
                    <v-text-field class = 'inputField' label = 'Confirm Password' required type = 'password' filled rounded dense></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-cols cols = '4'>
                    <v-btn id = 'submitButton' >
                        <label for="submitButtonFor" class = 'buttonLabel' @click="goToMain()">
                            Submit
                        </label>    
                    </v-btn>
                </v-cols>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
    .inputField {
        width:25rem;
        font-size: 1.45rem;
        font-family: Roboto;
        margin-left: 1.5em;
    }
    #submitButton{
        width:5em;
        font-family: Roboto;
        font-size: 1.45rem;
        font-weight: 500;
        background-color:#7983A6;
        color: #F2EEEE;
        margin-left:7.5em;
    }
    #app{
        width:24rem;
    }
    #container{
        background-color:#E5E5E5;
        height:24rem;
        width:30rem;
        box-shadow: 3px 5px #888888;
        margin-left: 23em;

    }
</style>

<script>
    import VueRouter from 'vue-router';
    import ErrorView from '../views/ErrorView';
    import ErrorView400 from '../views/ErrorView400';
    const router = new VueRouter({
        mode: 'history',
        route: [
            {
                name: 'login',
                path: '/',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('../views/login.vue')
            },
            {
                name: 'Error',
                path: '/error404',
                component: ErrorView
            },
            {
                name: 'Error400',
                path: '/error400',
                component: ErrorView400
            }
        ]
    });
    export default ({
        name:'signup',
        methods: {
            goToMain(){
                // Navigating to the named route
                // window.history.replaceState({}, document.title, " ");
                // console.log(window.history.length);
                this.$router.push({ path: '/'});
            }
        }
    })
</script>