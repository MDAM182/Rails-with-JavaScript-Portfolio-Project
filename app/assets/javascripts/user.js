$(() => {
  bindClickHandlersUser()
})

const bindClickHandlersUser = () => {
  $('.all_users').on('click', e => { //how does it know it's from navigation layout
    e.preventDefault()
    history.pushState(null, null, "users")
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
      users.forEach(user => {
        let newUser = new User(user)
        // console.log(newUser)
        let userHtml = newUser.formatIndex()
        // console.log(userHtml)
        $('#app-container').append(userHtml)
      })
    })
}

function User(user) {
  this.id = user.id
  this.username = user.username
  this.email = user.email
  this.password = user.password
}

User.prototype.formatIndex = function()  {
  let userHtml = `
    <a href="/users/${this.id}" data-id="${this.id}" class="show_link"><h1>${this.username}</h1>
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
          <h1>${this.title}</h1>
        <div class="workout-body">
          <h3> </h3>
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
  return userHtml
}
