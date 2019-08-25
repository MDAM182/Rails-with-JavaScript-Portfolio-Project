class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password
  has_many :workouts
  has_many :categories, through: :workouts
end
