class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :title, :description,  :level, :user_id, :category_id
  belongs_to :user
  belongs_to :category

end
