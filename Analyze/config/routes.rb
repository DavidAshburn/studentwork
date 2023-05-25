Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get 'home/profile'
  get 'exams/home'
  get 'exams/life1'
  get 'exams/life2'
  get 'exams/life3'
  get 'exams/life4'
  get 'exams/life5'  
end
