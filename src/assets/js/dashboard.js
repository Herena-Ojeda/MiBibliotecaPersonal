import { supabase } from './supabase.js'

window.onload = () => {
  const userId = localStorage.getItem('user_id')  

  if (!userId) {
    alert('Usuario no logueado')
    window.location.href = '../index.html'  
  } else {
    getUserData(userId)  
    loadUnreadBooks(userId)  
  }

  
  async function getUserData(userId) {
    try {
      const { data, error } = await supabase
        .from('user')
        .select('name, email')
        .eq('id', userId)
        .single()  

      if (error) {
        throw new Error(error.message)  
      }

      
      document.getElementById('user-name').textContent = data.name
      document.getElementById('user-email').textContent = data.email

      
    
    } catch (err) {
      console.error('Error al obtener los datos del usuario:', err)
      
      
    }
  }

  
  async function loadUnreadBooks(userId) {
    try {
      
      const { data, error } = await supabase
        .from('user_book')
        .select('book_id')  
        .eq('user_id', userId)  
        .eq('status', false)  

      if (error) {
        throw new Error(error.message)
      }

      
      if (data.length === 0) {
        console.log('No hay libros no leídos.')
        return
      }

      
      const bookIds = data.map(record => record.book_id)  

      
      const { data: books, error: booksError } = await supabase
        .from('book')
        .select('title, author, genre_id, published_date, genre(name)')
        .in('id', bookIds)  

      if (booksError) {
        throw new Error(booksError.message)
      }

      
      const tableBody = document.getElementById('books-table').getElementsByTagName('tbody')[0]
      
      books.forEach(book => {
        const row = tableBody.insertRow()
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre.name}</td>  <!-- Mostrar el nombre del género -->
          <td>${book.published_date}</td>
        `
      })
    } catch (err) {
      console.error('Error al obtener los libros no leídos:', err)
      document.getElementById('error-message').textContent = 'Error al cargar los libros. Intenta nuevamente más tarde.'
      document.getElementById('error-message').style.display = 'block'
    }
  }

  
  document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('user_id')  
    window.location.href = '../../index.html'  
  })
}
