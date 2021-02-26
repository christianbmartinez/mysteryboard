const form = document.getElementById('mysteryboard-form')  
const name = document.getElementById('name')
const content = document.getElementById('content')
const submit = document.getElementById('submit')
const date = document.getElementById('date')

window.onload = () => { // Form validation
    form.onsubmit = e => {
      if (!form.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      }  
      name.value ? name.value : name.value = 'Anonymous'
      date.value = Date.now()
      form.classList.add('was-validated')
    }, false      
}