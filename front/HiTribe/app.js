$(document).ready(function(event){
  store = {users:[], groups:[], groupUsers:[], currentUser:79, currentGroup:2}
  init()

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
  let currentUser=79
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
