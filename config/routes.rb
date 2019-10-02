Rails.application.routes.draw do
  root 'welcome#index'

  resources :users  do
    resources :workouts
  end
  resources :users
  resources :workouts
  resources :categories, except: [:destroy]




  get 'signup', to: 'users#new'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get '/auth/facebook/callback' => 'sessions#create'


end
