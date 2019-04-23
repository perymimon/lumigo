<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .screen {
    display: grid;
    grid-template-areas: "title title" " users chat" "users input";
    grid-template-rows: min-content 1fr min-content;
    grid-template-columns: 15em;
  }

  h1 {
    background-color: #2CBDA5;
    text-align: start;
    text-transform: capitalize;
    grid-area: title;
  }

  button.log-out {
    margin: 0;
    background: none;
    border: none;
    width: 1.5em;
    transform: rotateY(180deg);
    font-size: inherit;
  }

  button.log-out:hover * {
    fill: #2c3e50;
  }

  .users-list {
    grid-area: users;
    border-right: 2px solid #E4E5E6;
  }

  .chat-text {
    grid-area: chat;
    background-color: #F7F9FA;
    background-color: #E5DDD5;
    padding: 1em;
    display: grid;
    grid-auto-rows: max-content;
  }

  .message {
    background: white;
    width: max-content;
    min-width: 10em;
    padding: 0.3em;
    border-radius: 0 0.4em 0.4em 0.4em;
    position: relative;

    display: grid;
    grid-template-areas: "name" "text" "id";

  }

  .message:before {
    content: '';
    display: block;
    position: absolute;
    border-block-start: 0.8em solid white;
    border-inline-start: 0.8em solid transparent;
    right: 100%;
    top: 0;
  }

  .message .name{
    display: none;
  }

  .message.new .name{
    display: unset;
  }
  .message.me:before {
    /*border-inline-start: none;*/
    /*border-block-start: 0.8em solid white;*/
    /*border-inline-end: 0.8em solid transparent;*/
    left: 100%;
  }

  .message.me {
    border-radius: 0.4em 0 0.4em 0.4em;
    /*text-align: end;*/
    justify-self: end;
    direction: rtl;
  }

  .message .name {
    grid-area: name;
    color: #3CCF9A;
    font-size: 0.8em;
    justify-self: start;
    line-height: 1;
  }

  .message .text {
    grid-area: text;
    direction: inherit;
  }

  .message .id {
    grid-area: id;
    font-size: 0.5em;
    justify-self: end;
    line-height: 1;

  }


  form {
    grid-area: input;
    display: flex;
    padding: 0.4em;
    font-size: 1.5em;
    background: #EFEFEF;
  }

  form input {
    width: 100%;
    border-radius: 10px;
    border: none;

  }
</style>

<template>
  <div class="screen">
    <h1>
      <button class="log-out" @click="exit()">
        <svg viewBox="30 210 210 150" xmlns="http://www.w3.org/2000/svg" stroke="#000" stroke-linecap="square">
          <path stroke="none"
                d="M3.7969 236.9531l156.375 8.4375-5.2031-30.6562h1.9687l77.7656 72-77.7656 72h-1.9687l5.2031-30.7969-156.375 8.7187v-99.7031z"/>
        </svg>
      </button>

      {{room.name}} Room
    </h1>

    <ul class="users-list">
      <li v-for="user in users" @key="user.id">
        <span>{{user.name}}</span>
      </li>
    </ul>

    <ul class="chat-text">
      <li v-for="message in messages" @key="message.text"
          :class="{message:true, me:+message.userId===+userId, new:message.newSpeaker}">
        <span class="id">{{message.userId}}</span>
        <span class="name">{{message.name}}</span>
        <span class="text">{{message.text}}</span>
      </li>
    </ul>

    <form @submit.prevent="send()">
      <input type="text" v-model="userText" placeholder="want to say something?" autofocus>
    </form>


  </div>
</template>

<script>
  import roomService from '@/service/rooms-service'
  import {ROUTE} from '@/router'


  export default {
    name: 'rooms-screen',
    data () {
      return {
        users: [],
        messages: [],
        userText: '',
        room: {},
        from: 0,
        length: 40,
        userId: null,
      }
    },
    methods: {
      async send () {
        const userId = this.$data.userId
        await this.room.addText(this.userText, userId)
        this.userText = ''
        this.$data.messages = await this.room.getText(0, 100);
      },
      exit () {
        this.$router.push('/rooms')
      },
    },
    async mounted () {
      const vm = this
      const roomId = vm.$route.params.id
      const room = vm.$data.room = await roomService.getDetails(roomId)
      const userId = vm.$data.userId = +vm.$root.$data.user.id

      await room.addUser(+userId)
      vm.$data.users = await room.getUsers(vm.from, vm.from + vm.length)
      vm.$data.messages = await room.getText(0, 100)

    },
    async destroyed () {
      const vm = this
      await vm.room.removeUser(vm.$data.userId)
    },
  }
</script>

