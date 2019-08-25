class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  belongs_to :user
  belongs_to :category
end
