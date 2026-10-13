import { useEffect, useState } from 'react'
import { crearLibro, eliminarLibro, obtenerLibros } from './api.js'

function App() {
  const [libros, setLibros] = useState([])
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerLibros()
      .then(setLibros)
      .catch((e) => setError(e.message))
  }, [])

  async function manejarEnvio(evento) {
    evento.preventDefault()
    try {
      const nuevo = await crearLibro({ titulo, autor })
      setLibros([...libros, nuevo])
      setTitulo('')
      setAutor('')
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  async function manejarEliminar(id) {
    try {
      await eliminarLibro(id)
      setLibros(libros.filter((libro) => libro.id !== id))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <main>
      <h1>Biblioteca</h1>

      <form onSubmit={manejarEnvio}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <button type="submit">Agregar libro</button>
      </form>

      {error && <p>{error}</p>}

      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            <strong>{libro.titulo}</strong> — {libro.autor}{' '}
            <button onClick={() => manejarEliminar(libro.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
