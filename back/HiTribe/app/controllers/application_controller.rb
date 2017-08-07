class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  def current_user
    session[:user_id] ||= nil
  end

  def user_logged_in?
    if current_user
      true
    else
      false
    end
  end

  def index
    render json: {message: "TESTING"}
  end

end
