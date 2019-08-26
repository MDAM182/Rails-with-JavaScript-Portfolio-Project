class WorkoutsController < ApplicationController
  before_action :set_workout, only: [:edit, :update, :show, :destroy]
  before_action :require_user, except: [:index, :show]
  before_action :require_same_user, only: [:edit, :update, :destroy]

  def index
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
      if @user.nil?
          flash[:danger] = "User not found"
          redirect_to users_path
      else
         @workouts = @user.workouts
      end
    else
      @workouts = Workout.all
      respond_to do |f|
        f.html {render :index}
        f.json {render json: @workouts}
      end
    end
  end

  def new
     @workout = Workout.new
  end

  def create
    @workout = Workout.new(workout_params)
     @workout.user = current_user
     if @workout.save
      flash[:success] = "Workout was successfully created"
        respond_to do |f|
          f.html {redirect_to workout_path(@workout)}
          f.json {render json: @workouts}
        end
    else
      render 'new'
    end
  end

  def edit

  end

  def update
    if @workout.update(workout_params)
      flash[:success] = "Workout was successfully updated"
      redirect_to workout_path(@workout)
    else
      render 'edit'
    end
  end

  def show
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
      @workout = @user.workouts.find_by(id: params[:id])
      if @workout.nil?
        flash[:danger] = "Workout not found"
        redirect_to user_workouts_path(@user)
      end
    else
      @workout = Workout.find(params[:id])
      respond_to do |f|
        f.html {render :show}
        f.json {render json: @workout}
      end
    end
  end

  def destroy
    @workout.destroy
    flash[:success] = "Workout was successfully deleted"
    redirect_to workouts_path
  end


private

  def set_workout
    @workout = Workout.find(params[:id])
  end

  def workout_params
    params.require(:workout).permit(:title, :description, :level, :user_id, :category_id)
  end

  def require_same_user
    if current_user != @workout.user && !current_user.admin?
      flash[:danger] = "You can only edit or delete your own workout"
      redirect_to root_path
    end
  end
end
