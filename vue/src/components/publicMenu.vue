<template>
    <v-container id='container'>
        <v-row>
            <v-col>
                    <v-menu 
                        offset-y
                        transition="slide-y-transition"
                        bottom
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn     
                                block 
                                depressed                          
                                id='btn'
                                v-bind="attrs"
                                v-on="on"
                            >
                                <h4 id="userText">{{contactTag[0]}}</h4> 
                            </v-btn>
                        </template>
                        <v-list id="list">
                            <v-list-item
                                v-for="(item, index) in contactTag[1]"
                                :key="index"
                            >

                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title" class="listItemText"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.value" class="listItemText"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    #btn {
        background-color: #7983A6 !important;
        font-size: 2rem;
        font-weight: 400;
        color: #F2EEEE;
        text-align: left;
    }
    #list {
        background-color: #7983A6 !important;
        color: #F2EEEE;
    }
    .listItemText {
        font-size: 1.5rem;
        font-weight: 600;
    }

    #userText {
        text-transform: capitalize;
    }
</style>

<script>
    export default {
        name: 'publicMenu',
        props: ['contactTag'] 
    }
</script>