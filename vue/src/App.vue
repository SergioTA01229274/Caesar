<template>
  <div id="app">
    <router-view>
      <div id="nav">
        <router-link to="/">Login</router-link> |
      </div>
    </router-view>
  </div>
</template>

<style lang="scss">

#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>