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
