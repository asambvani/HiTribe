Group = createGroup()

function createGroup(){
  return class {

    constructor(id, name){
      this.id = id
      this.name =  name
      this.messages = []
      store.groups.push(this)
    }

    users(){
      return store.groupUsers.filter((groupUser)=>{
        return this.id === groupUser.groupId
      }).map(function(groupUser){
        return User.find(groupUser.userId)
      })
    }

    static find(id){
      return store.groups.find(function(group){
        return parseInt(group.id) === id
      })
    }

    renderMessages(){
      //need to input first part of URL
      fetch(`http://localhost:3000/groups/${this.id}/messages`).then(function(response){
        return response.json()
      }).then((data)=>{
        // parse data properly
        this.messages = []
        data.forEach((message)=>{
          this.messages.push({userId:message.user_id ,messageText:message.message_text})
        })
      }).then(()=>{
        $('#messages-container').empty()
        $('#messages-container').append(this.messagesHTML())
      })
    }

    groupHTML(){
      return `<li class="group" data-id="${this.id}"> ${this.name}</li>`
    }

    messagesHTML(){
      return this.messages.map(function(message){
        return `<strong><p>${message.userId}:</strong>  ${message.messageText}</p>`
      }).join('')
    }

    static allGroupsHTML(){
      let returnHTML = '<li class="group-label">Friends<a class="modal-trigger" href="#modal1"><i class="material-icons right" id="add-friend">add_circle_outline</i></a></li><br><li class="group-label">Tribes         <a class="modal-trigger" href="#modal2"><i class="material-icons right" id="add-group">add_circle_outline</i></a></li>'
      return returnHTML + (store.groups.map(function(group){
        return group.groupHTML()
      }).join(''))
    }
  }
}


// for render groups method:
