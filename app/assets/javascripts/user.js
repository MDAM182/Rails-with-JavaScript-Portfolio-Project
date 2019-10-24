

function User(user) {
  this.id = user.id
  this.username = user.username
  this.email = user.email
  this.password = user.password
  this.workouts = user.workouts
  this.categories = user.categories

}

User.prototype.formatIndex = function()  {
  let userHtml =
  ` <div align="center">
      <ul class="listing">
        <div class="row">
          <div class="well col-md-4 col-md-offset-4">
            <li class="workout-title">
             <a href="/users/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.username}</h1>
            </li>
          </div>
        </div>
      </ul>
    </div>
`
  return userHtml
}

User.prototype.formatShow = function()  {
  let userHtml = `
  <h1 align="center">Welcome to ${this.username}'s page</h1>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 center">
    </div>
  </div>
  <h4 align="center"> ${this.username}'s workouts</h4>

  <h1 align="center">Listing all workouts</h1>
  <div align="center">
  <div class="row">
    <div class="col-xs-8 col-xs-offset-2">
      <div class="well well-lg">
        <div class="workout-title">
         <a href="/workouts/${this.id}" data-id="${this.id}" class="show_workout">
          <h1> ${this.workouts[0].title} </h1> </a>
        <div class="workout-body">
          <h4 class="center description"><strong> Description: </strong></h4>
          <hr>
          <h4> ${this.workouts[0].description} </h4>

            <h4> ${this.workouts[0].level} </h4>

        <div class="workout-meta-details">
        <small>Category: </small>
        <a href="/categories/${this.id}" data-id="${this.id}">
              <h4> ${this.categories[0].name} </h4> </a


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
  return userHtml
}

const bindClickHandlersUser = () => {
  $('.all_users').on('click', e => {
    e.preventDefault()
    history.pushState(null, null, "/users")
    getUsers()


  })
//
  $(document).on('click', ".show_link", function(e) {
    e.preventDefault()
    $('#app-container').html('')
    let id = $(this).attr('data-id')
    fetch(`/users/${id}.json`)
    .then(res => res.json())
    .then(user => {
      let newUser = new User(user)

      let userHtml = newUser.formatShow()

      $('#app-container').append(userHtml)

    })
  })

};

const getUsers = () => {
  fetch(`/users.json`)
    .then(res => res.json())
    .then(users => {
      $('#app-container').html('')
      $('#app-container').append(`<h1 align="center">All Members</h1>`)
      users.forEach(user => {
        let newUser = new User(user)
        // console.log(newUser)
        let userHtml = newUser.formatIndex()
        // console.log(userHtml)
        $('#app-container').append(userHtml)
      })
    })
}

// const workoutData = () => {
//   workouts.forEach(workout => {
//     let newWo = new Workout(workout)
//       return newWo
//
//   })
// }

$(() => {
  bindClickHandlersUser();


    if ($('.users.index').length > 0) {
    history.pushState(null, null, `/users`)
    getUsers()
    // console.log('ON THE USERS INDEX PAGE')
  }
})
