import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.0.0/+esm'

const supabaseUrl = 'https://awfzslfxanganqwxduqs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3ZnpzbGZ4YW5nYW5xd3hkdXFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDkyNTQsImV4cCI6MjA0NzUyNTI1NH0.v-ELhP_YheuR_8qvPWlHB3P-SzXtoYEan9SLi7NIWzo'
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
    cargarBibliotecaCompleta();
});

async function getLibrary(userId) {
    const { data, error } = await supabase
        .from('user_book')
        .select('book_id, book(*)')
        .eq('user_id', userId);
    
    if (error) {
        console.error('Error fetching library:', error);
        return [];
    }
    return data;
}

async function cargarBibliotecaCompleta() {
    try {
        const userId = 1;
        const libros = await getLibrary(userId);
        
        const bibliotecaContainer = document.getElementById('mi-biblioteca');
        
        // Crear estructura de la tabla y el botón
        const contenidoHTML = `
            <div class="biblioteca-tabla">
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Fecha de Publicación</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${libros.map(libro => `
                            <tr>
                                <td>${libro.book.title}</td>
                                <td>${libro.book.author}</td>
                                <td>${new Date(libro.book.published_date).toLocaleDateString()}</td>
                                <td>${libro.book.status || 'Sin estado'}</td>
                                <td>
                                    <button class="btn-edit" data-id="${libro.book_id}">
                                        <i class="fa-solid fa-edit"></i>
                                    </button>
                                    <button class="btn-delete" data-id="${libro.book_id}">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="add-book-container">
                <a href="newBook.html" class="btn-add-book">
                    <i class="fa-solid fa-plus"></i> Añadir Nuevo Libro
                </a>
            </div>
        `;
        
        bibliotecaContainer.innerHTML = contenidoHTML;

        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', () => {
                const bookId = button.dataset.id;
                editarLibro(bookId);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', () => {
                const bookId = button.dataset.id;
                eliminarLibro(bookId);
            });
        });
    } catch (error) {
        console.error('Error al cargar la biblioteca:', error);
    }
}

async function editarLibro(bookId) {
    console.log('Editar libro:', bookId);
    window.location.href = `editBook.html?id=${bookId}`;
}

async function eliminarLibro(bookId) {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
        try {
            const { error } = await supabase
                .from('user_book')
                .delete()
                .eq('book_id', bookId);

            if (error) throw error;
            
            // Recargar la tabla después de eliminar
            cargarBibliotecaCompleta();
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    }
} 