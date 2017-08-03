function createMessageClass(){

  return class{
    static commentsHTML(message){
      return this.comments(message).map(function(comment){
        debugger
        return `<li><strong>${User.find(comment.user_id).username}</strong>: ${comment.comment_text} </li>`

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
