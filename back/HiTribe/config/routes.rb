Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/', to: 'application#index'
  get '/login', to: 'user_sessions#login', as: "login"
  get '/groups/:id/messages', to: 'groups#messages', as: 'group_messages'
  get '/groups/:id/users', to: 'groups#users', as: 'group_users'
  post '/groups/:id/users', to: 'groups#add_user', as: 'group_add_user'

  get '/users/:id/friends', to: 'users#friends', as: 'user_friends'
  post '/users/:id/friends', to: 'users#create_friend', as: 'create_friend'
  get '/users/:id/groups', to: 'users#groups', as: 'user_groups'
  get '/users/:id/group_users', to: 'users#group_users', as: 'user_group_users'

  post '/messages/:id/comment', to: 'messages#comment', as: 'message_comment'

  resources :users, :groups, :messages

end
