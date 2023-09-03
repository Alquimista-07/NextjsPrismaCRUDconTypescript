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

/*
-----------------------------------------------------------------------------------
NOTA IMPORTANTE: Librearía Axios para manejo de peticiones HTTP con fetch
-----------------------------------------------------------------------------------

Ya con la configuración del formulario usando la librería react hook form podemos enviar los datos hacia el 
backend a través de peticiones fetch, pero también para esto tenemos una biblioteca llamada Axios que nos 
facilita mucho esta tarea y nos evita escribir muchas líneas de código.

Entonces para usarla es necesario instalarla. Para ello ejecutamos el comando:

    npm install axios

Y posteriormente importarla.
*/
import axios from 'axios';

// Ahora lo que quremos es que redireccione luego de que responda el backend y se alamacenen los datos
// en la BD y para ello usamos el Router
import { useRouter } from 'next/navigation';

function NewPage() {

  // NOTA: Lo que hace el hook useForm es permitirnos manejar el evento del envío del formulario, es decir, puedo
  //       importar desde allí una función llamada el handleSubmit.
  //       Adicionalmente también tenemos una función llamada register para registrar el input que queramos recibir
  //       y de esta forma capturar sus datos
  const { handleSubmit, register } = useForm()

  // Entonces acá podemos usar el hook useRouter que me da un objeto router que puedo usar para cambiar de página
  // Pero hay que recordar que como acá no tengo una etiqueta link y quero ejecutarlo de manera programada, es decir,
  // que cuando termine de responderme el backen quiero una redirección entonces tenemos que usar este router que hemos 
  // creado
  const router = useRouter()

  // Entonces esta constante que llamamos enviar va a tener la ejecución del handleSubmit
  // y esto nos va a dar los datos (data) y estos datos son justamente los datos que tipea
  // el usuario
  const enviar = handleSubmit( async data => {
    console.log(data);
    // Ahora con la ayuda de la biblioteca axios enviamos los datos al backend
    // y le indicamos la ruta y luego la data (tarea) que queremos enviar.
    // Y al ser una función asíncrona usamos el async y el await
    const resp = await axios.post( 'api/tasks', data );
    console.log(resp);

    // Como mencionamos anteriormente hacemos la redirección luego del posteo de los datos
    // entonces redireccionamos al home o ruta inicial
    router.push('/');
  });

  return (
    <section className="h-screen flex items-center justify-center">

      <form onSubmit={enviar}>

        <label htmlFor="title" className='font-bold text-xs'>
          Escribe un título
        </label>
        <input id='title' type="text" placeholder="Escribe un titulo"
               className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2"
               {...register('title')}/>

        <label htmlFor="description" className='font-bold text-xs'>
          Escribe un descripción
        </label>
        <textarea id='description' placeholder="Escribe la descripción de la tarea"
                  className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full"
                  {...register('description')}/>

        <button className='bg-sky-500 px-3 py-2 rounded-md text-white mt-2'>
          Crear
        </button>

      </form>

    </section>
  )
}

export default NewPage