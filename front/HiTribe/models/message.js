function createMessageClass(){

  return class{
    static commentsHTML(message){
      return this.comments(message).map(function(comment){
        return `<div class="col s12"><div class="comment card-action"><strong>${User.find(comment.user_id).username}</strong>: ${comment.comment_text}</div></div>`
      }).join("")
    }

    static comments(message){
      return message.comments.filter((comment)=>{
        return comment.messageId === this.id

      })
    }
  }
}

Message = new createMessageClass()
