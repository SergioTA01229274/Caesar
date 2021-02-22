<template>
  <div id="app">
<<<<<<< HEAD
    <div id="nav">
      <router-link to="/"></router-link> |
      <router-link to="/about"></router-link>
      <router-link to="/chat"></router-link>
    </div>
    <router-view/>
=======
    <router-view>
      <div id="nav">
        <router-link to="/">Home</router-link> |
      </div>
    </router-view>
>>>>>>> 292baf666caaaa01f11a9259612f6de2be364455
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
