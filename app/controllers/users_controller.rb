class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update, :show]
  before_action :require_same_user, only: [:edit, :update]
  before_action :require_admin, only: [:destroy]

  def index
    @users = User.all
    respond_to do |f|
			f.html {render :index}
			f.json {render json: @users}
		end
  end

  def new
   @user = User.new
  end

  def create
   @user = User.new(user_params)
   if @user.save
     session[:user_id] = @user.id
     flash[:success] = "Welcome to the Exercise Room #{@user.username}!"
      respond_to do |f|
        f.html {redirect_to user_path(@user)}
        f.json {render json: @user}
      end
   else
     render 'new'
   end
  end

  def edit

  end

  def update
    if @user.update(user_params)
       flash[:success] = "Your account was updated successfully"
       redirect_to workouts_path
    else
      render 'edit'
    end
  end

  def show
    @user_workouts = @user.workouts.all
    respond_to do |f|
			f.html {render :show}
			f.json {render json: @user}
		end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    flash[:danger] = "User and all workouts created by user have been deleted"
    redirect_to users_path
  end

private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
   params.require(:user).permit(:username, :email, :password)
  end

  def require_same_user
    if current_user != @user && !current_user.admin?
      flash[:danger] = "You can only edit your own account"
      redirect_to root_path
    end
  end

  def require_admin
    if logged_in? && !current_user.admin?
      flash[:danger] = "Only admin users can perform that action"
      redirect_to root_path
    end
  end
end
