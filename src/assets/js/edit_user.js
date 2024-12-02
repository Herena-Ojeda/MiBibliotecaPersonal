import { supabase } from './supabase.js';  


const userId = localStorage.getItem('user_id');  


if (!userId) {
    alert('Usuario No Logueado. Redirigiendo...');
    window.location.href = '/index.html'; 
  }


async function loadUserData() {
  try {
    const { data, error } = await supabase
      .from('user')  
      .select('*')
      .eq('id', userId)  
      .single();  

    if (error) {
      console.error('Error al obtener los datos del usuario:', error.message);
      return;
    }

    
    document.getElementById('user-name').value = data.name;
    document.getElementById('first-surname').value = data.first_surname;
    document.getElementById('user-email').value = data.email;

    
  } catch (err) {
    console.error('Error al cargar los datos del usuario:', err);
  }
}


async function updateUserData(event) {
  event.preventDefault();

  const updatedName = document.getElementById('user-name').value;
  const updatedFirstSurname = document.getElementById('first-surname').value;
  const updatedEmail = document.getElementById('user-email').value;
  const updatedPassword = document.getElementById('user-password').value;

  
  const userUpdates = {
    name: updatedName,
    first_surname: updatedFirstSurname,
    email: updatedEmail,
  };

  
  if (updatedPassword) {
    userUpdates.password = updatedPassword;
  }

  try {
    const { data, error } = await supabase
      .from('user')  
      .update(userUpdates)  
      .eq('id', userId);  

    if (error) {
      console.error('Error al actualizar el usuario:', error.message);
      alert('No se pudo actualizar la información. Intenta de nuevo.');
      return;
    }

    alert('Usuario actualizado correctamente');
    window.location.href = 'dashboard.html';  
  } catch (err) {
    console.error('Error al actualizar los datos del usuario:', err);
    alert('Ocurrió un error. Intenta de nuevo.');
  }
}


window.onload = loadUserData;


document.getElementById('edit-user-form').addEventListener('submit', updateUserData);
