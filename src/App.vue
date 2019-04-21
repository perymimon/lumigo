<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: grid;
    grid-template-rows: min-content 1fr;
    height: 100%;
  }

  .top-bar{
    height: min-content;
    background-color: #2CBDA5;
    height: 3em;
  }
  img.logo{
    float: left;
    height: 100%;
  }
</style>

<template>
  <div id="app">

    <div class="top-bar">
      <img class="logo" src="./assets/logo.png">
    </div>

    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

