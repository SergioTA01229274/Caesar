<template>
        <div data-app >
        <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        depressed
                        id="privateMButton"
                        class="mx-2"
                        v-bind="attrs"
                        v-on="on"
                        fab
                    ><v-img src="../assets/CaesarLogo.png" id="vimg"></v-img>
                    </v-btn>
                </template>
                <v-list id='list'>
                    <v-list-item
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" class="listItemValue"></v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.value" class="listItemValue"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
            </div>
</template>

<style scoped>
    #vimg {
        height: 3em;
        width: 3em;
    }
    #list {
        background: #79797D;
    }
    .listItemValue {
        font-size: 1.25rem;
        font-weight: 500;
    }
    #privateMButton{
        background-color: #79797D;
    }
</style>

<script>
    export default {
        data: () => ({
      items: [
        { title: 'Account Registration Date',   value: '10/02/2021'},
        { title: 'Last Connection',             value: '18/02/2021' },
        { title: 'IP Address',                  value: '164.23.42.33'},
        { title: 'Public Key',                  value: 'asdfCSC3d' },
        { title: 'Private Key Loaded',          value: 'bgdjFSDsd' },
      ],
    }),
    name: 'privateMenu'
    }
</script>