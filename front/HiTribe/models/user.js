User = createUser()

function createUser(){
  return class User{
    constructor(id, firstName, lastName){
      this.id = id
      this.firstName = firstName
      this.lastName = lastName
      store.users.push(this)
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
