import axios from 'axios';
const BASE_URL = '//localhost:3001/rooms'

export class RoomsService {
  static async getAll () {
    const res = await axios.get(`${BASE_URL}`)
    return res.data.map(r => new Room(r.id, r.name))

  }

  static async getDetails (id) {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  }

  static async createRoom (roomName) {
    const res = await axios.post(`${BASE_URL}`, {
      name: roomName,
    });
    const data = res.data;
    return new Room(data.roomId, roomName);
  }

}


export class Room {
  constructor (roomId, roomName) {
    this.id = roomId
    this.name = roomName
  }

  getAllUsers (from, to) {
    const params = new URLSearchParams()
    params.append('from', from)
    params.append('to', to)

    return axios.get(`${BASE_URL}/${this.id}/users`, params)
  }

  addUser (userId) {
    return axios.post(`${BASE_URL}/${this.id}/users`, {
      userId,
    })
  }

  removeUser (userId) {
    return axios.delete(`${BASE_URL}/${this.id}/users/${userId}`)
  }

  addText (text, userId) {
    return axios.post(`${BASE_URL}/${this.id}/text`, {
      text, userId,
    })
  }

  getText (from, to) {
    const params = new URLSearchParams()
    params.append('from', from)
    params.append('to', to)

    return axios.get(`${BASE_URL}/${this.id}/text`, params)
  }
}

export default RoomsService;
