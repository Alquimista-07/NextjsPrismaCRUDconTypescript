//NOTA: Para visualizar este componente podemo en la url del navegador
//      indicar el /new (Ej: http://localhost:3000/new)

function NewPage() {
  return (
    <section className="h-screen flex items-center justify-center">

      <form>
        <input type="text" placeholder="Escribe un titulo"
               className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2"/>
        <textarea placeholder="Escribe la descripción de la tarea"
                  className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full"/>
        <button>
          Crear
        </button>
      </form>

    </section>
  )
}

export default NewPage