$(() => {
  bindClickHandlers()
})

const bindClickHandlers = () => {
  $('.all_workouts').on('click', e => { //how does it know it's from navigation layout
    e.preventDefault()

    history.pushState(null, null, "workouts")
    fetch(`/workouts.json`)
      .then(res => res.json())
      .then(workouts => {
        $('#app-container').html('')
        workouts.forEach(workout => {
          let newWorkout = new Workout(workout)
          // console.log(newUser)
          let workoutHtml = newWorkout.formatIndex()
          // console.log(userHtml)
          $('#app-container').append(workoutHtml)
        })
      })

  })

  $("#new_workout").on("submit", function(e){
    e.preventDefault()

    const values = $(this).serialize()
    $.workout("/workouts", values).done(function(data) {
      $('#app-container').html("")
      const newWorkout = new Workout(data)
      const htmlToAdd = newWorkout.formatIndex

      $('#app-container').html("htmlToAdd")

    })
  })
}


  const getWorkouts = () => {

  }

  function Workout(workout) {
    this.id = workout.id
    this.title = workout.title
    this.description = workout.description
    this.level = workout.level
    this.user_id = workout.user_id
    this.category_id = workout.category_id

  }



Workout.prototype.formatIndex = function()  {
    let workoutHtml = `
    <h1 align="center">Listing all workouts</h1>
    <div align="center">
    <div class="row">
      <div class="col-xs-8 col-xs-offset-2">
        <div class="well well-lg">
          <div class="workout-title">
            <h1>${this.title}</h1>
          <div class="workout-body">
            <h3> ${this.description}</h3>
          <div class="workout-meta-details">

          <small>Created by: </small>
        </div>
        <div class="workout-actions">
        </div>
          </div>
          </div>
          </div>
        </div>
       </div>
      </div>
      </div>

      `
    return workoutHtml

}
