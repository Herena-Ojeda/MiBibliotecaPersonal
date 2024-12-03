import { supabase, handleError } from './supabase.js'

async function loginUser(email, password) {
  try {
   
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)  
      .eq('password', password)  

    if (error) {
      console.error('Error en la consulta de login:', error.message)
      throw new Error(error.message)
    }

    if (data.length === 0) {
      console.log('Usuario no encontrado o credenciales incorrectas.')
      return null 
    }

    console.log('Usuario autenticado:') 

    
    localStorage.setItem('user_id', data[0].id)  

    return data[0].id 
  } catch (err) {
    handleError(err)
  }
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const result = await loginUser(email, password)

  if (result) {
    alert('Login exitoso.')
    window.location.href = '/src/views/dashboard.html' 
  } else {
    alert('Credenciales incorrectas. Por favor, intenta nuevamente.')
  }
})

window.onload = function() {
  localStorage.clear()
}
