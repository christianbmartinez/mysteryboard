const form = document.getElementById('form')  
const user = document.getElementById('user')
const content = document.getElementById('content')
const submit = document.getElementById('submit')
const date = document.getElementById('date')

window.onload = () => { // Form validation
  form.onsubmit = e => {
    if (!form.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
    }  
    user.value ? user.value : user.value = 'Anonymous'
    date.value = Date.now()
    form.classList.add('was-validated')
  }, false      
}