import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm'

const supabaseUrl = 'https://awfzslfxanganqwxduqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZnpzbGZ4YW5nYW5xd3hkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDkyNTQsImV4cCI6MjA0NzUyNTI1NH0.v-ELhP_YheuR_8qvPWlHB3P-SzXtoYEan9SLi7NIWzo'
const supabase = createClient(supabaseUrl, supabaseKey)

async function editBook(event) {
    event.preventDefault(); 

    const id = document.getElementById('edit_id').value;
    const title = document.getElementById('edit_title').value;
    const author = document.getElementById('edit_author').value;
    //const genre_id = document.getElementById('edit_genre_id').value;
    const published_date = document.getElementById('edit_published_date').value;
    const summary = document.getElementById('edit_summary').value;

    const { data, error } = await supabase
        .from('book')
        .update({
            title: title,
            author: author,
            //genre_id: genre_id,
            published_date: published_date,
            summary: summary
        })
        .eq('id', id); 

    if (error) {
        console.error('Error al editar el libro:', error);
        alert('Error al editar el libro. Inténtalo de nuevo.');
    } else {
        alert('Libro editado con éxito.');
    }
}

document.getElementById('bookEditForm').addEventListener('submit', editBook);
