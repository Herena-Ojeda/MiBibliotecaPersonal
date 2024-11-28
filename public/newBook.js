import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm'

const supabaseUrl = 'https://awfzslfxanganqwxduqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZnpzbGZ4YW5nYW5xd3hkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDkyNTQsImV4cCI6MjA0NzUyNTI1NH0.v-ELhP_YheuR_8qvPWlHB3P-SzXtoYEan9SLi7NIWzo'
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.querySelector('#bookForm')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = form.title.value
    const author = form.author.value
    //const genre_id = form.genre_name.value
    const published_date = form.published_date.value
    const summary = form.summary.value

    const { error } = await supabase
        .from('book')
        .insert({ title, author, published_date, summary })
    if (error) {
        console.log(error)
    } else {
        console.log('Libro creado correctamente')
    }
})