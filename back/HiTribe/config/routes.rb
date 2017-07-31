Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/groups/:id/messages', to: 'groups#messages', as: 'group_messages'

  get '/users/:id/friends', to: 'users#friends', as: 'user_friends'
  get '/users/:id/groups', to: 'users#groups', as: 'user_groups'
  get '/users/:id/group_users', to: 'users#group_users', as: 'user_group_users'

  resources :users, :groups

end
