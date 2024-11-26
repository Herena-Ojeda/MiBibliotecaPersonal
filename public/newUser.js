import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm'

const supabaseUrl = 'https://awfzslfxanganqwxduqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZnpzbGZ4YW5nYW5xd3hkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDkyNTQsImV4cCI6MjA0NzUyNTI1NH0.v-ELhP_YheuR_8qvPWlHB3P-SzXtoYEan9SLi7NIWzo'
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.querySelector('#userForm')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = form.name.value
    const first_surname = form.first_surname.value
    const email = form.email.value
    const user_name = form.user_name.value
    const password = form.password.value

    const { error } = await supabase
        .from('user')
        .insert({ name, first_surname, email, user_name, password })
    if (error) {
        console.log(error)
    } else {
        console.log('Usuario registrado correctamente')
    }
})

