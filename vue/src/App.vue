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

<script>
  "use strict";
  const express = require('express');
  const DB = require('./db');
  const config = require('./config');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const bodyParser = require('body-parser');

  const db = new DB("sqlitedb")
  const app = express();
  const router = express.Router();

  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  export default {
    
  }
</script>