function createMessageClass(){

  return class{
    static commentsHTML(message){
      return this.comments(message).map(function(comment){
        return `<li>${comment.user_id}: ${comment.comment_text} </li>`
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
