<template>
  <v-row justify="left">
    <v-col
      cols="12"
      sm="16"
      md="12"
    >
      <v-card>
        <v-toolbar
          color=#7983A6
          dark
        >

          <v-text-field
           class="b"
           dense
           v-model="friendToAdd"
           >Search contact</v-text-field>

          <v-spacer></v-spacer>
          <v-btn icon @click="addContatc()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <div id="contactsCard">
          <template v-for="(item) in items" >
            <v-subheader
              v-if="item.header"
              :key="item.header"
              inset
              id="contactsSubHeader"
            >
                {{
                  item.header
                }}
            </v-subheader>
            
            <v-list-item
              v-else
              :key="item.title"
              ripple
              @click="changeReceiver(item.title)"
            >
            
            <v-avatar :color="item.avatarColor"><v-icon>
                {{item.avatar}}
              </v-icon></v-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title" style="font-size: 1.5rem"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
  export default {
    name:"ContactsBar",
    props: ['contacts'],
    data () {
      return {
        userContacts: this.contacts,
        friendToAdd: '',
        usernameInStor: localStorage.username,
        items: [
          {
            header: 'Contacts',
          }
        ],
      }
    },
    methods: {
      changeReceiver(tag){
        this.$emit('changeRTag', tag);
      },
      addContatc(){
        let body = {username: this.usernameInStor, contactToAdd: this.friendToAdd};
            axios.post(this.$serverBaseURL + 'addUserContact', body).then(response => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
        this.friendToAdd = '';
      }
    },
    watch: {
      contacts: {
        inmediate: true,
        handler(val, oldVal){
          this.userContacts = val;
            for(var i = 0; i < this.userContacts.length; i++){
              this.items.push({
                avatar: "mdi-sunglasses",
                avatarColor: '#' + Math.floor(Math.random()*16777215).toString(16),
                title: String(this.userContacts[i]),
              });
            }
        }
      }
      }
  }
</script>

<style scoped>
    .b {
      font-size: 1.5em;
      color: #F2EEEE;
    }
    #contactsSubHeader {
      font-size: 1.5rem;
      padding-left: 4rem;
      position: relative;
    }
    #contactsCard {
      height: 36.25rem !important;
      overflow: auto;
    }
</style>
