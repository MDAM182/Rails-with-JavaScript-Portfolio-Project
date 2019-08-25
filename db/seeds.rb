# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Workout.create(level:'Beginner')
Workout.create(level:'Intermediate')
Workout.create(level:'Advanced')
Workout.create(level:'Expert')

User.create(username:"Alfa" , email: "alfa@alfa.com" , password: "army1", admin: false)
User.create(username:"Bravo" , email:"bravo@bravo.com" , password: "army1", admin: false)
User.create(username:"Delta" , email:"delta@delta.com" , password: "army1", admin: false)
User.create(username:"Mike" , email:"mike@mike.com" , password: "army1", admin: true)
User.create(username:"Echo" , email:"echo@echo.com" , password: "army1", admin: false)



Category.create(name: "Core")
Category.create(name: "Upperbody")
Category.create(name: "Lowerbody")

Workout.create(title: "Push-Ups", description: "A basic push up is an effective
  way to strengthen the chest and arm muscles and can be easily scaled as you get stronger.", level: "", user_id: 1, category_id: 2)

Workout.create(title: "Pull-Ups", description: "Pull ups work all of the “pull”
     muscles in your body: your back, biceps, forearms. They are indicative of your level of fitness.", level:"", user_id: 2, category_id: 2)

Workout.create(title: "Sit-Ups", description: "Sit ups can help build your core and abdominal muscles.",level:"", user_id: 3, category_id: 1)
