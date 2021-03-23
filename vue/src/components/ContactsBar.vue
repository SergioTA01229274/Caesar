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
           >Search contact</v-text-field>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
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

            <v-divider
              v-else-if="item.divider"
              :key="index"
              inset
            ></v-divider>

            <v-list-item
              v-else
              :key="item.title"
              ripple
            >
            <v-avatar :color="item.avatarColor"><v-icon>
                {{item.avatar}}
              </v-icon></v-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title" style="font-size: 1.5rem"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name:"ContactsBar",
    data () {
      return {
        items: [
          {
            header: 'Contacts',
          },
          { divider: true },
          {
            avatar: "mdi-sunglasses",
            avatarColor: '#' + Math.floor(Math.random()*16777215).toString(16),
            title: 'Mr. Blue',
            subtitle:
              `<span class="font-weight-bold" style="font-size: 1rem; color: green !important">Online</span>`,
          }
        ],
      }
    },
  }
</script>

<style lang="scss">
    .b {
      font-size: 1.5em;
      color: #F2EEEE;
    }
    #contactsSubHeader {
      font-size: 1.5rem;
      padding-left: 4rem;
      position: relative;
    }
</style>
