import { supabase, handleError } from './supabase.js'

async function registerUser(user) {
  try {
   
    const { data, error } = await supabase.from('user').insert([user]).select('*')

    if (error) {
      console.error('Error al registrar en la base de datos:', error.message)
      throw new Error(error.message)
    }

    console.log(data)
  
    
    return user 
  } catch (err) {
    handleError(err)
  }
}

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const user = {
    user_name: document.getElementById('user_name').value,
    name: document.getElementById('name').value,
    first_surname: document.getElementById('first_surname').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  }

  const result = await registerUser(user)

  if (result) {
    alert('Registro exitoso. Ahora puedes iniciar sesión.', result)
    window.location.href = '../../index.html'
  } else {
    alert('No se pudo completar el registro. Por favor, intenta nuevamente.')
  }
})