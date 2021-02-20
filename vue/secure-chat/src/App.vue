<template>
  <div id="app">
    <left-message-bar></left-message-bar>
    <toolbar-user></toolbar-user>
  </div>
</template>

<script>
import LeftMessageBar from "./components/LeftMessageBar.vue";
import ToolbarUser from "./components/ToolbarUser.vue";


export default {
  name: 'App',
  components: {
    LeftMessageBar,
    ToolbarUser
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
