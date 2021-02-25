<template>
    <div id="mainContainer">
            <div class="footer content" id="headerContainer">
                <img src="@/assets/img/CaesarLogo.png" id="caesarLogo">
                <span id="header">Welcome to Caesar
                <br><div id="subHeader"> A fully encrypted, anonymous and secure online chat</div>
                </span>
            </div>
        <login-section id="loginForm"></login-section>
    </div>
</template>

<style lang="scss">
    
    #caesarLogo {
        width: 15rem;
        height: 15rem;
        float: left;
        opacity: 75%;
    }
    #header {
        font-family: Roboto;
        font-size: 5rem;
        font-weight: 500;
        color: black;
    }
    #subHeader {
        font-family: Roboto;
        font-size: 2.5rem;
        font-weight: 500;
        margin-top: 1.5rem;
        color: black;
    }
    #loginForm {
        padding-left: 65%;
        position: fixed;
        bottom: 20rem;
        right: 3rem;
        top: 5rem;
    }
    #headerContainer {
        position: fixed;
        top: 5rem;
        left: 5rem;
    }
    #mainContainer {
        padding-top: 5rem;
    }
</style>


<script>
import LoginSection from '../components/loginSection.vue'
// @ is an alias to /src

export default { // When we export our view, we have to specify the components and the name
  name: 'Login',
  components: {
    LoginSection
  },
}
</script>
