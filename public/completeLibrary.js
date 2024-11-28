import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm'

const supabaseUrl = 'https://awfzslfxanganqwxduqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZnpzbGZ4YW5nYW5xd3hkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDkyNTQsImV4cCI6MjA0NzUyNTI1NH0.v-ELhP_YheuR_8qvPWlHB3P-SzXtoYEan9SLi7NIWzo'
const supabase = createClient(supabaseUrl, supabaseKey)
async function getLibrary(userId) {
    const { data, error } = await supabase.from('user_book').select('book_id, book(*)').eq('user_id', userId) 
    if (error) {
        console.error('Error fetching library:', error)
        return []
    }
    return data

}
document.addEventListener('DOMContentLoaded', async () => {
    const userId = 1; // Cambia este valor por el ID del usuario que deseas consultar
    const books = await getLibrary(userId);

    // Muestra los datos en la consola o en el DOM
    console.log('Libros del usuario:', books);
  });