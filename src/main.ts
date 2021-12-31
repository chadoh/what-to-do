const suggestionEl = document.querySelector('#activity')
const textarea = document.querySelector('textarea')
const saveButton = document.querySelector('#save')
const editButton = document.querySelector('#edit')
const editArea = document.querySelector('#edit-area')
const againButton = document.querySelector('#again') as HTMLElement
if (!suggestionEl || !textarea || !saveButton || !editButton || !againButton || !editArea) {
  throw new Error('cannot find expected DOM elements')
}

const defaultPossibilities = `watching TV
reading to each other
learning to play a song together
drawing maps from memory or imagination
cooking something fun
build kites; go fly them
yoga`

const LOCAL_STORAGE_KEY = 'activities'

function getAll({ raw = false } = {}) {
  const possibilities = localStorage.getItem(LOCAL_STORAGE_KEY) || defaultPossibilities
  if (raw) return possibilities
  return possibilities.split('\n')
}

function suggest() {
  againButton.style.display = 'none'
  suggestionEl.closest('h1').classList.add('loader')

  const possibilities = getAll()
  const suggestion = possibilities[
    Math.floor(Math.random() * possibilities.length)
  ]

  setTimeout(() => {
    suggestionEl.closest('h1').classList.remove('loader')
    suggestionEl.innerHTML = suggestion
    againButton.style.display = null
  }, 750)
}

function toggleEditor() {
  const editing = editArea.className === 'active'
  editArea.className = editing ? '' : 'active'
  if (!editing) textarea.focus()
}

textarea.value = getAll({ raw: true }) as string
saveButton.addEventListener('click', () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, textarea.value)
  toggleEditor()
  suggest()
})

againButton.addEventListener('click', suggest)
editButton.addEventListener('click', toggleEditor)

suggest()
