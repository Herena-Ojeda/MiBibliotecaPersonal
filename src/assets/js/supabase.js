import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://awfzslfxanganqwxduqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZnpzbGZ4YW5nYW5xd3hkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDkyNTQsImV4cCI6MjA0NzUyNTI1NH0.v-ELhP_YheuR_8qvPWlHB3P-SzXtoYEan9SLi7NIWzo'
const supabase = createClient(supabaseUrl, supabaseKey)


function handleError(error) {
  console.error("Error:", error.message);
  alert("Ocurrió un error: " + error.message)
}


export { supabase, handleError }
