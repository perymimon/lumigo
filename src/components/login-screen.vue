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
  }


</style>
<template>
  <div class="login-screen">
    <div class="modal-window">
      <h1>Login</h1>
      <form @action.prevent="login()">
        <label for="name"></label>
        <input id="name" type="text" v-model="user.name" placeholder="what your name?" autofocus>
        <button @click.prevent="login()">Go</button>
      </form>
    </div>
  </div>
</template>

<script>
  import UsersService from '@/service/users-service';
  import {ROUTE} from '@/router';

  export default {
    name: 'login-screen',

    data () {
      return {
        user: {name: 'test user'},
      }
    },
    methods: {
      async login () {
        const user = await UsersService.createUser(this.user.name);
        this.$router.push(ROUTE.ROOMS);
      },
    },
  }
</script>


