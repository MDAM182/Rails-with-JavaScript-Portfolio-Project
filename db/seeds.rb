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

Workout.create(title: "Push-Ups", description: "A basic push up is an effective
  way to strengthen the chest and arm muscles and can be easily scaled as you get stronger.")

Workout.create(title: "Pull-Ups", description: "Pull ups work all of the “pull”
     muscles in your body: your back, biceps, forearms. They are indicative of your level of fitness.")

Workout.create(title: "Sit-Ups", description: "Psit ups can help build your core and abdominal muscles.")

Categorey.create(name: "Core")
Categorey.create(name: "Upperbody")
Categorey.create(name: "Lowerbody")
