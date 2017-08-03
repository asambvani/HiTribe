$(document).ready(function(event){
  $('.modal').modal();
  store = {friends:[], groups:[], groupUsers:[], currentUser: null, currentGroup:null, intervalId:0 }
  store.currentUser = window.localStorage.currentUser
  checkForLogin()
  listenForCreateUser()
  bindGroupNames()
  bindSubmit()
  bindAddGroup()
  bindAddFriend()
  bindShowFriends()
  bindAddFriendToGroup()
  bindLogout();
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
    store.groups = []
    data.forEach(function(group){
      new Group(group.id, group.name)
    }
  )
  }).then(function(){
    renderGroups()
  })

  //We don't need BOTH of these, will need to decide which approach we want when refactoring
  getFriends()
  getAllGroupMembers()

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
    autoDownScroll(450, '#messages-container')
    getAllGroupMembers()
  })
}

function bindSubmit(){
  $('body').on('click', '#new-message', function(event){
    submitMessage(event)
  })

  $('body').on('submit', '#messages-form', function(event){
    submitMessage(event)
  })
}

function submitMessage(event){
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
  autoDownScroll(450, '#messages-container')
}
function listenForNewMessages(){
  clearInterval(store.intervalId)
  store.intervalId = setInterval(function(){
    Group.find(store.currentGroup).renderMessages()
  } , 250)

}

function checkForLogin(){
  if(store.currentUser){
    init()
  } else{
    listenForLogin()
  }

  // fetch('http://localhost:3000/login').then(function(response){
  //   return response.json()
  // }).then(function(data){
  //   if(data.username===null){
  //     listenForLogin()
  //   } else{
  //     store.currentUser = data.id
  //   }
  // })
}

function listenForLogin(){
  //slide me up
  $(".card").css("overflow", "hidden")
  $(".card-reveal").css("display", "block")
  $(".card-reveal").css("transform", "translateY(-100%)")
  $("#login-form").on("submit", function(event){
    event.preventDefault()
    loginUsername = $("#login-username").val()
    loginPassword = $("#login-password").val()

    fetch(`http://localhost:3000/login?username=${loginUsername}`).then(function(response){
      return response.json()
    }).then(function(data){
      store.currentUser = data.id
      window.localStorage.setItem("currentUser",data.id)
      init()
    })

    $(".card-reveal").css("display", "none")
  })
}

function listenForCreateUser(){
  $('body').on('click', '#create-btn', function(){
    showCreateUser()
  })

  $('body').on('submit', '#create-form', function(event){
    event.preventDefault()
    let username = $('#create-username').val()
    let firstName = $('#create-first-name').val()
    let lastName = $('#create-last-name').val()
    //let password = $('#create-password')
    $.ajax({
      url: "http://localhost:3000/users",
      method: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({user: {username: username, first_name: firstName, last_name: lastName}})
    }).then(function(){
      showLogin()
    })
  })
}

function showLogin(){
  $('#login-form').css("display","block")
  $('#create-form').css("display","none")
}

function showCreateUser(){
  $('#login-form').css("display","none")
  $('#create-form').css("display","block")
}

function autoDownScroll(boxHeight, boxId){
  let messageBox = $(boxId)[0]
  messageBox.scrollTop = messageBox.scrollHeight - boxHeight
}

function bindAddGroup(){
  $('body').on('click', '#create-group', function(){
    let groupName = $('#new-group-name').val()
    if(groupName){
      $.ajax({
        url: "http://localhost:3000/groups",
        method: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({name: groupName, currentUser: store.currentUser})
      }).then(function(response){
        init()
      })
    }
  })
}

function bindAddFriend(){
  $('body').on('click', '#create-friend', function(){
    let friendName = $('#add-friend-name').val()
    if(friendName){
      $.ajax({
        url: `http://localhost:3000/users/${store.currentUser}/friends`,
        method: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({friend_name: friendName, currentUser: store.currentUser})
      }).then(function(){
        getFriends()
      })

    }
  })
}

function getFriends(){
  fetch(`http://localhost:3000/users/${store.currentUser}/friends`).then(function(response){
    return response.json()
  }).then(function(data){
    store.friends = []
    data.forEach(function(friend){
      new User(friend.id, friend.username, friend.first_name, friend.last_name)
    })}
  )
}

function bindShowFriends(){
  $("#friends-icon").on('click', function(){
    fetch(`http://localhost:3000/groups/${store.currentGroup}/users`).then(function(response){
      return response.json()
    }).then(function(data){
      $('#group-members ul').empty()
      data.forEach(function(user){
          $('#group-members ul').append(`<li>${user.username}</li>`)
      })
    })
  })
}

function bindAddFriendToGroup(){
  $('#add-user-to-group').on('click', function(){
    let username = $('#new-friend-in-group').val()
    $('#new-friend-in-group').val("")
    $.ajax({
      url: `http://localhost:3000/groups/${store.currentGroup}/users`,
      method: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({id: store.currentGroup, username: username})
    })
  })
}

function bindLogout(){
  $('#logout').on('click', function(){
    window.localStorage.setItem("currentUser", null)
    store.currentUser = null
    checkForLogin();
  })
}

function getAllGroupMembers(){
  fetch(`http://localhost:3000/groups/${store.currentGroup}/users`).then(function(response){
    return response.json()
  }).then(function(data){
    data.forEach(function(user){
      new User(user.id, user.username, user.first_name, user.last_name)
    })
  })
}
