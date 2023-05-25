class HomeController < ApplicationController
  def index
  end
  def profile
    @leads = Lead.all
  end
end
