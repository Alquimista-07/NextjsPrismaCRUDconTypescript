//NOTA: Para visualizar este componente podemo en la url del navegador
//      indicar el /new (Ej: http://localhost:3000/new)

/*
-----------------------------------
NOTA IMPORTANTE: React Hook Form
-----------------------------------

Si nosotros queremos capturar los datos del formulario, tenemos varias formas, podemos caputarlos cuando envíe el formulario, puede hacerlo mediante 
dos estados pero para este caso vamos a hacer uso de una biblioteca que nos viene bastante bien para manejar ese tipo de eventos y la cual se llama 
react hook form.

La web oficial de la biblioteca es: https://www.react-hook-form.com/

Esta biblioteca es bastante fácil de usar simplemente se instala y nos permite manejar formularios rápidamente.

Para instalar vamos a la documentación en Get Started y nos dice que ejecutemos el comando npm install react-hook-form

Por lo tanto para el manejo de formularios usando la biblioteca React hook form es necesario importar
pero al momento de usar el hook nos va a dar un error indicandonos que debería ser un componente cliente 
porque se están manejando hooks entonces para ello especificamos el "use client"
*/
"use client"
import { useForm } from 'react-hook-form';

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