const defaultActivities = `watching TV
reading to each other
learning to play a song together
drawing maps from memory or imagination
cooking something fun
build kites; go fly them
yoga`

let activities = localStorage.getItem('activities')
if (!activities) {
  activities = defaultActivities
}

const suggestion = document.querySelector('#activity')

if (suggestion) {
  const array = activities.split('\n')
  const randomActivity = array[Math.floor(Math.random() * array.length)]
  suggestion.innerHTML = randomActivity
}

const textarea = document.querySelector('textarea')
const saveButton = document.querySelector('#save')
const editButton = document.querySelector('#edit')
const editArea = document.querySelector('#edit-area')
if (editButton && editArea && textarea && saveButton) {
  editButton.addEventListener('click', event => {
    const editing = editArea.className === 'active'
    editArea.className = editing ? '' : 'active'
    if (!editing) textarea.focus()
  })

  textarea.value = activities
  saveButton.addEventListener('click', event => {
    localStorage.setItem('activities', textarea.value)
    window.location.reload(false)
  })
}
