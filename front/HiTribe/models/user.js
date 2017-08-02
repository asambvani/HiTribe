User = createUser()

function createUser(){
  return class User{
    constructor(id, username, firstName, lastName){
      this.id = id
      this.username = username
      this.firstName = firstName
      this.lastName = lastName
      store.friends.push(this)
    }
    messages(){
      // retrieve messages for this user from backend
    }
    static find(id){
      return store.users.filter(function(user){
        return id === user.id
      })
    }
  }
}
