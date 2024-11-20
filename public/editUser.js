import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm'

const supabaseUrl = 'https://awfzslfxanganqwxduqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZnpzbGZ4YW5nYW5xd3hkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDkyNTQsImV4cCI6MjA0NzUyNTI1NH0.v-ELhP_YheuR_8qvPWlHB3P-SzXtoYEan9SLi7NIWzo'
const supabase = createClient(supabaseUrl, supabaseKey)

const editForm = document.querySelector('#userEditForm')
const userId = 1
const editName = editForm.edit_name.value
const editFirstSurname = editForm.edit_first_surname.value
const editEmail = editForm.edit_email.value
const editUserName = editForm.edit_user_name.value
const { data, error } = await supabase
        .from('user') 
        .select('*') 
        .eq('id', userId) 
        .single();
if (error) {
    console.log(error)
} else {
    editForm.edit_name.value = data.name
    editForm.edit_first_surname.value = data.first_surname
    editForm.edit_email.value = data.email
    editForm.edit_user_name.value = data.user_name
}