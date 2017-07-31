Group = createGroup()

function createGroup(){
  return class {
    constructor(id, name){
      this.id = id
      this.name =  name
      store.groups.push(this)
    }
    users(){
      return store.groupUsers.filter((groupUser)=>{
        return this.id === groupUser.groupId
      }).map(function(groupUser){
        return User.find(groupUser.userId)
      })
    }

    messages(){
      //need to input first part of URL
      fetch(`/groups/${this.id}/messages`).then(function(response){
        return response.json()
      }).then(function(data){
        // parse data properly
      })
    }

    groupHTML(){
      return `<li class="group" data-id="${this.id}">${this.name}</li>`)
    }

    messagesHTML(){
      return this.messages().map(function(message){
        return `<p>${message.messageText}</p>`
      }).join('')
    }

    static allGroupsHTML(){
      return store.groups.map(function(group){
        return group.groupHTML()
      }).join('')
    }
  }
}


// for render groups method:
