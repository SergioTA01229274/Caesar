<template>
    <v-container id='container'>
        <v-row>
            <v-col cols="12">
                <div data-app>
                    <v-menu 
                        offset-y
                        transition="slide-y-transition"
                        bottom
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                dark
                                block
                                id = 'btn'
                                v-bind="attrs"
                                v-on="on"
                            >
                                <h4 id='text' > {{userName}} </h4> 
                            </v-btn>
                        </template>
                        <v-list id='list'>
                            <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                            >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.value"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    #btn {
        background-color: #7983A6 !important;
        text-align: left;
        margin-left: 0.5em;
        font-size: 2rem;
        font-weight: 500;
        color: #F2EEEE;
    }
    #list {
        background-color: #7983A6 !important;
        font-size: 2rem;
        color: #F2EEEE;
    }
    #text {
        float: left !important;
        text-transform: capitalize;
    }
</style>

<script>
    export default {
        data: () => ({
            userName: 'Mr. Blue',
            items: [
                { title: 'IP Address',      value: '187.43.123.65'},
                { title: 'Public Key',      value: 'adkXDFsdf134' },
                { title: 'Last Connection', value: '14/02/2021 17:31' },
                ],
            }),
        name: 'publicMenu',
        
    }
</script>