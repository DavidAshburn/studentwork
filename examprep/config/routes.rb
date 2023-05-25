Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get 'home/exam'
  get 'home/exam2'
  get 'home/exam3'
  get 'home/exam4'
  get 'home/exam5'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
