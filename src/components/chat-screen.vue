<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .screen {
    display: grid;
    grid-template-areas: "title title" " users chat" "users input";
    grid-template-rows: min-content 1fr min-content;
    grid-template-columns: 15em;
  }
  h1{
    background-color: #2CBDA5;
    text-align: start;
    text-transform: capitalize;
    grid-area: title;
  }

  button.log-out{
    position: absolute;
    right: 1em;
    grid-area: title;
  }

  .users-list{
    grid-area: users;
    border-right: 2px solid #E4E5E6;
  }

  .chat-text{
    grid-area: chat;
    background-color: #F7F9FA;

  }

  form{
    grid-area: input;
    display: flex;
  }

  input{
    width: 100%;
    border-radius: 10px;
  }


</style>

<template>
  <div class="screen">
      <h1>{{room.name}} Room</h1>

      <button class="log-out" @click="exit()">Log Out</button>

      <ul class="users-list">
        <li v-for="user in users" @key="user.id">
          <span>{{user.name}}</span>
        </li>
      </ul>

      <ul class="chat-text">
        <li v-for="text in texts" @key="text.id">
          <span>{{text}}</span>
        </li>
      </ul>

      <form @action="send()">
        <input type="text" v-model="userText" placeholder="want to say something?" autofocus>
      </form>


  </div>
</template>

<script>
  import roomService from '@/service/rooms-service'
  import {ROUTE} from '@/router';

  export default {
    name: 'rooms-screen',
    data () {
      return {
        users: [],
        texts: [],
        userText: '',
        room:{name:'test', id:1}
      }
    },
    methods: {
      send () {

      },
      exit(){

      }
    },
    async mounted () {
      const vm = this
      vm.$data.rooms = await roomService.getAll()
    },
  }
</script>

