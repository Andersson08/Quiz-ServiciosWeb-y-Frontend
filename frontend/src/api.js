const API_URL = 'http://localhost:8000/api/libros'

export async function obtenerLibros() {
  const respuesta = await fetch(API_URL)
  if (!respuesta.ok) throw new Error('No se pudieron cargar los libros')
  return respuesta.json()
}

export async function crearLibro(datos) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!respuesta.ok) throw new Error('El título y el autor son obligatorios')
  return respuesta.json()
}

export async function eliminarLibro(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  if (!respuesta.ok) throw new Error('No se pudo eliminar el libro')
}
