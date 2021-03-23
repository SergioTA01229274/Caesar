<template>
        <div data-app >
        <v-menu offset-y id="privMenuSection">
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
                            <v-list-item-title class="listItemValue">hola</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title class="listItemValue"></v-list-item-title>
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
        width: 35rem;
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
    name: 'privateMenu',
    props: ['privInfo'],
    mounted(){
        console.log(this.items);
    },
    data(){
        return {
            items: this.privInfo
        }
    }
}
</script>