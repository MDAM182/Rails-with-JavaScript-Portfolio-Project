class CategoriesController < ApplicationController
  before_action :require_admin, except: [:index, :show]

  def index
    @categories = Category.all
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      flash[:success] = "Category was created successfully"
      redirect_to categories_path
    else
      render 'new'
    end
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      flash[:success] = "Category name was updated successfully"
      redirect_to category_path(@category)
    else
      render 'edit'
    end
  end

  def show
    @category = Category.find(params[:id])
    @category_workouts = @category.workouts.all
  end

  # def destroy
  #   @category = Category.find(params[:id])
  #   flash[:success] = "Category was successfully deleted"
  #   redirect_to category_path
  # end
private

  def category_params
    params.require(:category).permit(:name)
  end

  def require_admin
    if !logged_in? || (logged_in? && !current_user.admin?)
      flash[:danger] = "Only admins can perform that action"
      redirect_to categories_path
    end
  end

end
