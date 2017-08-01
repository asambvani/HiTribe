$(document).ready(function(event){
  store = {users:[], groups:[], groupUsers:[], currentUser:99, currentGroup:2, intervalId:0 }
  init()
  bindGroupNames()
  bindSubmit()
  //need to wait for init() to finish...
  // Group.find(store.currentGroup).renderMessages()

})

function renderPage(){
  renderMessages()
  renderGroups()
}

function renderGroups(){
  $('#groups-container').empty()
  $('#groups-container').append(Group.allGroupsHTML())
}


function init(){
  //manually log in with the first user (for now)
  let currentUser=store.currentUser
  //to fill in the rest of this url
  fetch(`http://localhost:3000/users/${currentUser}/groups`).then(function(response){
    return response.json()
  }).then(function(data){
    data.forEach(function(group){
      new Group(group.id, group.name)
    })
  }).then(function(){
    renderGroups()
  })

  // fetch(`http://localhost:3000/users/${currentUser.id}/friends`).then(function(response){
  //   return response.json()
  // }).then(function(data){
  //   data.forEach(function(user){
  //     new User(user.id, user.name)
  //   })
  // })
  //
  // fetch(`http://localhost:3000/users/${currentUser.id}/group-users`).then(function(response){
  //   return response.json()
  // }).then(function(data){
  //   data.forEach(function(groupUser){
  //     new groupUser(groupUser.userId, groupUser.groupId)
  //   })
  // })
  //fetch users
  //fetch groups
  //user_groups
}
// Event Listeners
function bindGroupNames(){
  $('body').on('click', '.group', function(){
    let groupId = parseInt(this.dataset.id)
    Group.find(groupId).renderMessages()
    store.currentGroup = groupId
    listenForNewMessages()
  })
}


//refactor this method, it's not DRY
function bindSubmit(){
  $('body').on('click', '#new-message', function(event){
      let messageText = $('#message-text').val()
      $('#message-text').val("")
      event.preventDefault();
      $.ajax({
        url: "http://localhost:3000/messages",
        method: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({text: messageText, currentUser: store.currentUser, currentGroup: store.currentGroup})
      })
  })

  $('body').on('submit', 'form', function(event){
      let messageText = $('#message-text').val()
      $('#message-text').val("")
      event.preventDefault();
      $.ajax({
        url: "http://localhost:3000/messages",
        method: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({text: messageText, currentUser: store.currentUser, currentGroup: store.currentGroup})
      })
  })

}

function listenForNewMessages(){
  clearInterval(store.intervalId)
  store.intervalId = setInterval(function(){
    Group.find(store.currentGroup).renderMessages()
  } , 1000)
}
