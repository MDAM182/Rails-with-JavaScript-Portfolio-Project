


//creating object and setting attributes for workout

function Workout(workout) { //constructor
  this.id = workout.id
  this.title = workout.title
  this.description = workout.description
  this.level = workout.level
  this.user_id = workout.user_id
  this.category_id = workout.category_id
  this.user = workout.user
  this.category = workout.category

}

Workout.prototype.formatIndex = function()  {

    let workoutHtml =

    `

  <div align="center">
    <div class="row">
      <div class="col-xs-8 col-xs-offset-2">
        <div class="well well-lg">
          <div class="workout-title">
            <div>
              <a href="/workouts/${this.id}" data-id="${this.id}" class="show_workout">
              <h1>${this.title}</h1> </a>
            </div>
            <div class="workout-body">
               <h4> ${this.description}</h4>

            <div class="workout-meta-details">
            <small>Created by:<a href="/users/${this.id}" data-id="${this.id}" class="show_link">
              <h4>${this.user.username}</h3> </a> </small>
            </div>
            <small>Category: </small>
            <a href="/categories/${this.id}" data-id="${this.id}">
                  <h4> ${this.category.name} </h4> </a>
            <div class="workout-actions">
              <a href="/workouts/${this.id}/edit" data-id="${this.id}" class=edit_workout_path >
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

Workout.prototype.formatShow = function()  {
  let workoutHtml = `
  <h2 align="center">${this.title} </h2>

  <div class="well col-xs-8 col-xs-offset-2">
    <ul class="listing">
      <div class="row center">
        <div class="col-md-4 col-md-offset-4">

            <li>Created by:</li>
            <a href="/users/${this.id}" data-id="${this.id}" class="show_link">
              <h1>${this.user.username}</h1>
            </a>

          <div class="workout-body">
            <h4 class="center description"> <strong> Description: </strong> </h4>
              <p> ${this.description} </p>
                  <h4> ${this.level} </h4>
          </div>
        </div>
      </div>
    </ul/
  </div>
`
  return workoutHtml
}

const bindClickHandlers = () => {
  $('.all_workouts').on('click', e => { //how does it know it's from navigation layout
    e.preventDefault()

    history.pushState(null, null, `/workouts`) //with forward slash it does not append
    getWorkouts()

  })

  $(document).on('click', ".show_workout", function(e) {
    e.preventDefault()
    $('#app-container').html('')
    let id = $(this).attr('data-id')
    fetch(`/workouts/${id}.json`)
    .then(res => res.json())
    .then(workout => {
      let newWorkout = new Workout(workout)

      let workoutHtml = newWorkout.formatShow()

      $('#app-container').append(workoutHtml)

    })
  })

  $("#new_workout").on("submit", function(e){
    e.preventDefault()

    const values = $(this).serialize()
    $.post("/workouts", values).done(function(data) {
      $('#app-container').html("")
      const newWorkout = new Workout(data)
      const htmlToAdd = newWorkout.formatShow()

      $('#app-container').html(htmlToAdd)

    })
  })
}


  const getWorkouts = () => {
    fetch(`/workouts.json`)
      .then(res => res.json())
      .then(workouts => {
        $('#app-container').html('')
        $('#app-container').append(`<h1 align="center">Listing all workouts</h1>`)
        workouts.forEach(workout => {
          let newWorkout = new Workout(workout)
          // console.log(newUser)
          let workoutHtml = newWorkout.formatIndex()
          // console.log(userHtml)
          $('#app-container').append(workoutHtml)

        })

      })

  }

  $(() => {
    bindClickHandlers();
    //everything in this space always runs

  if ($('.workouts.index').length > 0) {
    history.pushState(null, null, `/workouts`)
    fetch(`/workouts.json`)
      .then(res => res.json())
      .then(workouts => {
        $('#app-container').html('')
        $('#app-container').append(`<h1 align="center">Listing all workouts</h1>`)
        workouts.forEach(workout => {
          let newWorkout = new Workout(workout)
          // console.log(newWorkout)
          let workoutHtml = newWorkout.formatIndex()
          // console.log(workoutHtml)
          $('#app-container').append(workoutHtml)

        })
      })
    // runs only when we finds the div with workouts & index classes
    // console.log('ON THE WORKOUTS INDEX PAGE')
  }
})
