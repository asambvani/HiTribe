store = {users:[], groups:[], groupUsers:[]}

function renderPage(){
  renderMessages()
  renderGroups()
}

function renderGroups(){
  $('#groups-container').empty()
  $('#groups-container').append(Group.allGroupsHTML())
}
function renderMessages(){
  $('#messages-container').empty()

}

function init(){
  //manually log in with the first user (for now)
  let currentUser=1
  //to fill in the rest of this url
  fetch(`/users/${currentUser.id}/groups`).then(function(response){
    return response.json()
  }).then(function(data){
    data.forEach(function(group){
      new Group(group.id, group.name)
    })
  })

  fetch(`/users/${currentUser.id}/friends`).then(function(response){
    return response.json()
  }).then(function(data){
    data.forEach(function(user){
      new User(user.id, user.name)
    })
  })

  fetch(`users/${currentUser.id}/group-users`).then(function(response){
    return response.json()
  }).then(function(data){
    data.forEach(function(groupUser){
      new groupUser(groupUser.userId, groupUser.groupId)
    })
  })
  //fetch users
  //fetch groups
  //user_groups
}
