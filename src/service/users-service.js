import axios from 'axios';
const BASE_URL = '//localhost:3001/users'

export class UsersService {

  static async getAll () {
    if(UsersService.allUsers){

    }

    const res = await axios.get(`${BASE_URL}`)
    return res.data.reduce((map, user) => {
      map[user.id] = user;
      return map
    }, {});//.map(r => new Room(r.id, r.name))

  }

  static async createUser (userName) {
    try{
      const res = await axios.post(`${BASE_URL}`, {
        name: userName,
      })
      const user = {id:res.data.userId, name:userName};
      localStorage.userId = user.id;
      return user;
    } catch (e){
      console.error(e, 'error in createUser')
    }

  }

  static async isUserLogin(){
    if(localStorage.userId){
      const usersMap = await UsersService.getAll();
      return !!usersMap[localStorage.userId];
    }
    return false

  }

}

export default UsersService;
