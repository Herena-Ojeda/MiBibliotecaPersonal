import { supabase } from './supabase.js'

const userId = localStorage.getItem('user_id')

if (!userId) {
  alert('Usuario no logueado. Redirigiendo...')
  window.location.href = '/index.html'
}

async function loadUserBooks() {
  try {
    const { data, error } = await supabase
      .from('user_book')
      .select('book_id, status, book(title, author, genre_id, published_date)')
      .eq('user_id', userId)

    if (error) {
      console.error('Error al obtener los libros:', error.message)
      return
    }

    const bookList = document.getElementById('book-list')

    if (data.length === 0) {
      bookList.innerHTML = '<tr><td colspan="6">No tienes libros en tu biblioteca.</td></tr>'
      return
    }

    bookList.innerHTML = ''

    
    data.forEach(({ book_id, status, book }) => {
      const row = document.createElement('tr')
      row.setAttribute('data-book-id', book_id)

      
      getGenreNameById(book.genre_id).then(genreName => {
        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${genreName}</td>
          <td>${book.published_date}</td>
          <td>${status ? 'Leído' : 'No leído'}</td>
          <td><button class="btn-edit toggle-status-btn" data-book-id="${book_id}" data-status="${status}">Cambiar estado</i></button></td>
        `
        bookList.appendChild(row)
      })
    })
  } catch (err) {
    console.error('Error al cargar los libros:', err)
    document.getElementById('book-list').innerHTML = '<tr><td colspan="6">Error al cargar los libros. Por favor, intenta de nuevo.</td></tr>'
  }
}


async function getGenreNameById(genreId) {
  try {
    const { data, error } = await supabase
      .from('genre')
      .select('name')
      .eq('id', genreId)
      .single()

    if (error) {
      console.error('Error al obtener el género:', error.message)
      throw new Error(error.message)
    }

    return data ? data.name : null
  } catch (err) {
    console.error('Error al obtener el nombre del género:', err)
    throw err
  }
}


async function toggleBookStatus(bookId, currentStatus) {
  const newStatus = !currentStatus 

  try {
    const { data, error } = await supabase
      .from('user_book')
      .update({ status: newStatus })
      .eq('book_id', bookId)
      .eq('user_id', userId)

    if (error) {
      console.error('Error al actualizar el estado del libro:', error.message)
      return
    }

    
    const row = document.querySelector(`tr[data-book-id="${bookId}"]`)
    const statusCell = row.querySelector('td:nth-child(5)')
    const statusButton = row.querySelector('.toggle-status-btn')

    
    statusCell.textContent = newStatus ? 'Leído' : 'No leído'
    
    
    statusButton.setAttribute('data-status', newStatus)
    statusButton.textContent = `Cambiar estado` 
  } catch (err) {
    console.error('Error al cambiar el estado del libro:', err)
  }
}

document.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('toggle-status-btn')) {
    const bookId = event.target.getAttribute('data-book-id')
    const currentStatus = event.target.getAttribute('data-status') === 'true' 
    toggleBookStatus(bookId, currentStatus)
}})

document.addEventListener('DOMContentLoaded', loadUserBooks)


