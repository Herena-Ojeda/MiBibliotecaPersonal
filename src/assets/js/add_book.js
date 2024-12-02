// Configuración de Supabase
import { supabase, handleError } from './supabase.js'

const userId = localStorage.getItem('user_id');  


if (!userId) {
  alert('Usuario No Logueado. Redirigiendo...');
  window.location.href = '/index.html'; 
}


async function loadGenres() {
  try {
    const { data, error} = await supabase
      .from('genre')
      .select('id, name')

    if (error) {
      console.error('Error al obtener los géneros:', error.message)
      return
    }

    const genreSelect = document.getElementById('book-genre')
    data.forEach(genre => {
      const option = document.createElement('option')
      option.value = genre.id
      option.textContent = genre.name
      genreSelect.appendChild(option)
    })
  } catch (err) {
    console.error('Error al cargar los géneros:', err)
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
    console.error(err)
    throw err
  }
}


async function addBook(book) {
  try {
    const { data, error } = await supabase
      .from('book')
      .insert([book])
      .select('*')

    if (error) {
      console.error('Error al agregar el libro:', error.message)
      throw new Error(error.message)
    }

   
    const lastInsertedBook = data[0] 
    console.log('Libro agregado:', lastInsertedBook)
    
    return lastInsertedBook 
  } catch (err) {
    console.error(err)
    throw err
  }
}


async function addUserBook(userId, bookId) {
  try {
    const { data, error } = await supabase
      .from('user_book')
      .insert([{ user_id: userId, book_id: bookId, status: false, created_at: new Date().toISOString() }])

    if (error) {
      console.error('Error al asociar el libro al usuario:', error.message)
      throw new Error(error.message)
    }

    console.log('Libro asociado al usuario')
  } catch (err) {
    console.error(err)
    throw err
  }
}


document.getElementById('add-book-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const userId = localStorage.getItem('user_id') 

  if (!userId) {
    alert('No se encontró el ID del usuario en el almacenamiento local.')
    return
  }

  try {
    const genreId = document.getElementById('book-genre').value 
    const genreName = await getGenreNameById(genreId) 

    if (!genreName) {
      alert('No se encontró el género.')
      return
    }

    const book = {
      title: document.getElementById('book-title').value,
      author: document.getElementById('book-author').value,
      genre_id: genreId,
      published_date: document.getElementById('book-published-date').value,
      summary: document.getElementById('book-summary').value,
      created_at: new Date().toISOString(),
    }

   
    const bookData = await addBook(book)

    
    await addUserBook(userId, bookData.id)

    alert('Libro agregado y asociado a tu biblioteca.')
    window.location.href = 'my_library.html' 
  } catch (err) {
    alert('No se pudo agregar el libro. Por favor, intenta de nuevo.')
    console.error(err)
  }
})


window.onload = loadGenres
