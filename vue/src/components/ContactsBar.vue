<template>
  <v-row justify="left">
    <v-col
      cols="12"
      sm="16"
      md="10"
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
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              inset
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
              <v-list-item-avatar>
                <img :src="item.avatar">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
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
    name: "LeftMessageBar"
}
</script>

<script>
  export default {
    data () {
      return {
        items: [
          {
            header: 'Contacts',
          },
          { divider: true },
          {
            avatar: 'https://picsum.photos/250/300?image=660',
            title: 'Meeting @ Noon',
            subtitle:
              `<span class="font-weight-bold">Spike Lee</span> &mdash; I'll be in your neighborhood`,
          }
        ],
      }
    },
  }
</script>

<style scoped>

    .b {
      font-size: 1.5em;
      color: #F2EEEE;
    }
</style>