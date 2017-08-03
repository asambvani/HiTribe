function createMessageClass(){

  return class{
    static commentsHTML(message){
      return this.comments(message).map(function(comment){
        return `<li class="card-action"><strong><img src=${User.find(comment.user_id).imageURL}></img>${User.find(comment.user_id).username}</strong>: ${comment.comment_text} </li>`
      })
    }

    static comments(message){
      return message.comments.filter((comment)=>{
        return comment.messageId === this.id

      })
    }
  }
}

Message = new createMessageClass()
