<style scoped>
  .room-screen {

  }

  .modal-window {
    display: grid;
    grid-template-areas: "title" "search" "room-list";
    grid-template-rows: min-content min-content 1fr;
  }

  h1 {
    grid-area: title;
    background-color: #EEEEEE;
    margin: 0;
    /*text-align: start;*/
  }

  input {
    grid-area: search;
    line-height: 1.5em;
    padding: 0 0.3em;
  }

  ul {
    grid-area: room-list;
    /*border:1px solid;*/
    list-style-type: none;
    margin: 0;
    padding: 0.3em;

  }

  li {
    text-align: start;
    line-height: 2em;
    border-bottom: 1px solid #F2F2F2;
  }

  a, a:active, a:hover {
    text-decoration: none;
    color: black;
    text-transform: capitalize;

  }

  button {
    margin-top: 1em;
  }

  form {
    position: relative;
  }

  form input {
    width: 100%;
    padding-right: 2em;
  }

  .badget {
    font-size: 10px;
    color: #2CBDA5;
    margin-inline-start: 0.2em;
    position: absolute;
    right: 0.2em;
    line-height: 2.5em;
  }
</style>

<template>
  <div class="room-screen">
    <div class="modal-window">
      <h1>Rooms</h1>
      <input type="text" v-model="filter" placeholder="Looking for room?">
      <ul>
        <li v-if="rooms.length" v-for="room in rooms" :key="room.id">
          <router-link :to="'/rooms/'+room.id">{{room.name}} room</router-link>
        </li>
        <li>
<!--          <form @action.prevent="creatNewRoom(e)">-->
            <input v-model="filter" @keydown.enter="creatNewRoom()">
<!--            <span class="badget">new</span>-->
<!--          </form>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import roomService from '@/service/rooms-service'
  import {ROUTE} from '@/router';

  export default {
    name: 'rooms-screen',
    data () {
      return {
        rooms: [{id: 1, name: 'mingling'}, {id: 2, name: 'bome bome'}],
        filter: 'filter',
      }
    },
    methods: {
      async creatNewRoom () {
        const vm = this;
        const newRoom = await roomService.createRoom(vm.filter);
        this.$router.push({name:ROUTE.CHAT, params:{id:newRoom.id}});
      },
    },
    async mounted () {
      const vm = this
      vm.$data.rooms = await roomService.getAll()
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

