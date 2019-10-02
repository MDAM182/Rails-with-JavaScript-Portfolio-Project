class CategoriesController < ApplicationController
  before_action :require_admin, except: [:index, :show]

  def index
    @categories = Category.all
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @categories}
    end
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
      if @category.save
        flash[:success] = "Category was created successfully"
        respond_to do |f|
          f.html {redirect_to categories_path(@category)}
          f.json {render json: @category}
        end
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
    if params[:user_id]
        @user = User.find_by(id: params[:user_id])
        @category = @user.categories.find_by(id: params[:id])
        if @category.nil?
          flash[:danger] = "category not found"
          redirect_to user_categories_path(@user)
        end
      else
        @category = Category.find(params[:id])
        respond_to do |f|
          f.html {render :show}
          f.json {render json: @category}
      end
    end
  end

  # def destroy
  #   @category = Category.find(params[:id])
  #   flash[:success] = "Category was successfully deleted"
  #   redirect_to category_path
  # end
private

  def category_params
    params.require(:category).permit(:name, :user_id)
  end

  def require_admin
    if !logged_in? || (logged_in? && !current_user.admin?)
      flash[:danger] = "Only admins can perform that action"
      redirect_to categories_path
    end
  end
end
