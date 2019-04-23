import axios from 'axios'
import userService from '@/service/users-service'


const BASE_URL = '//localhost:3001/rooms'


export class RoomsService {
  static async getAll () {
    const res = await axios.get(`${BASE_URL}`)
    return res.data.map(r => new Room(r.id, r.name))

  }

  static async getDetails (id) {
    const res = await axios.get(`${BASE_URL}/${id}`)
    return new Room(id, res.data.name)
  }

  static async createRoom (roomName) {
    const res = await axios.post(`${BASE_URL}`, {
      name: roomName,
    })
    const data = res.data
    return new Room(data.roomId, roomName)
  }

}


export class Room {
  constructor (roomId, roomName) {
    this.id = roomId
    this.name = roomName
  }

  async getUsers (from, to) {
    if (typeof from == 'undefined' || typeof to == 'undefined') {
      throw Error('from and to must defined')
    }
    const pUser = userService.getAll()
    const pRoomUser = axios.get(`${BASE_URL}/${this.id}/users`, {params: {from, to}})
      .then(ret => ret.data.users)

    const [usersMap, roomUsers] = await Promise.all([pUser, pRoomUser])
    return [...new Set(roomUsers)].map(id => usersMap[id])
  }

  async addUser (userId) {
    const restUrl = `${BASE_URL}/${this.id}/users`
    const res = await axios.post(restUrl, {
      userId,
    })
    return res.data
  }

  async removeUser (userId) {
    return await axios.delete(`${BASE_URL}/${this.id}/users/${userId}`)
  }

  async addText (text, userId) {
    return await axios.post(`${BASE_URL}/${this.id}/text`, {
      text, userId,
    })
  }

  async getText (from, to) {
    const pUser = userService.getAll()
    const pTexts = axios.get(`${BASE_URL}/${this.id}/text`, {params: {from, to}})
      .then(res => res.data)

    const [usersMap, messages] = await Promise.all([pUser, pTexts])
    messages.forEach(m => m.name = usersMap[m.userId].name);
    messages.reduce( (lastId,m)=>{
      m.newSpeaker = (lastId!==m.userId);
      return m.userId
    },'');
    return messages
  }
}


export default RoomsService
