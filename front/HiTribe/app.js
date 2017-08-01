$(document).ready(function(event){
  store = {users:[], groups:[], groupUsers:[], currentUser:0, currentGroup:2, intervalId:0 }
  listenForLogin()
  listenForCreateUser()
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

  $('body').on('submit', '#messages-form', function(event){
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
