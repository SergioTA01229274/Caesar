<template>
    <div id="mainContainer">
            <div class="footer content">
                <img src="../assets/CaesarLogo.png" id="caesarLogo">
                <span id="header">Welcome to Caesar
                <br><span id="subHeader"> A fully encrypted, anonymous and secure online chat</span>
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
        position: absolute;
    }
    #subHeader {
        margin-top: 2rem;
        font-family: Roboto;
        font-size: 2.5rem;
        font-weight: 500;
        position: absolute;
        text-align: center;
    }
    #loginForm {
        padding-left: 65%;
        position: absolute;
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
