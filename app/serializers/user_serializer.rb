class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password, :admin
  has_many :workouts
  has_many :categories
end
