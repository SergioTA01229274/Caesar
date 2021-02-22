<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> <!-- This is how we use an exported component in a view --> 
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' // This is how we import a component from our components folder

export default { // When we export our view, we have to specify the components and the name
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
