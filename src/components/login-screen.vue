<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-screen {

  }

  .modal-window {
    display: grid;
    grid-template-areas: "login" "form";
  }

  h1 {
    grid-area: login;
  }

  form{
    grid-area: form;
    display: grid;
    grid-template-areas: "input" "button";
    grid-column: min-content;
    align-content: space-around;
    font-size: 1.5em;
    place-self: center;
    grid-template-columns: min-content;
    grid-template-rows: min-content min-content;
    justify-content: center;

    margin-block-start: 5em;

  }

  form input{
    grid-area: input;
    font-size: inherit;
  }

  form button{
    grid-area: button;
    font-size: inherit;
  }


</style>
<template>
  <div class="login-screen">
<!--    <div class="modal-window">-->
      <h1>Login</h1>
      <form @submit.prevent="login()">
        <label for="name"></label>
        <input id="name" type="text" v-model="user.name" placeholder="what your name?" autofocus>
        <button>Go</button>
      </form>
    </div>
<!--  </div>-->
</template>

<script>
  import UsersService from '@/service/users-service';
  import {ROUTE} from '@/router';

  export default {
    name: 'login-screen',

    data () {
      return {
        user: {},
      }
    },
    methods: {
      async login () {
        const vm = this;
        const user = await UsersService.createUser(this.user.name);
        vm.$root.$data.user = user;
        this.$router.push(ROUTE.ROOMS);

      },
    },
  }
</script>


