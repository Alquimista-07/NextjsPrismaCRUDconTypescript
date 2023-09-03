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

// Importación useEffect
import { useEffect } from 'react';

// NOTA: Ahora como estamos usando el mismo componente formulario para crear y editar lo que tenemos que hacer
//       es validar si existe un parámentro en la url y de esta forma detectar si estamos creando o editando
//       y por lo tanto ya con el parámetro podemos consultarlo cuando cargue la página, entonces recordando 
//       del curso de react del mismo autor (Canal YouTube - Fazt)podemos usar el hook useEffect para ratificar 
//       que se ejecute cuando haya cargado la página.
function NewPage( {params}: {params: { id: string }} ) {

  // NOTA: Lo que hace el hook useForm es permitirnos manejar el evento del envío del formulario, es decir, puedo
  //       importar desde allí una función llamada el handleSubmit.
  //       Adicionalmente también tenemos una función llamada register para registrar el input que queramos recibir
  //       y de esta forma capturar sus datos.
  //       Tenemos otra función de react hook form que nos permite pasar datos al formulario ya que esto lo requerimos
  //       debido a que estamos usando el mismo formulario para actualizar los datos
  const { handleSubmit, register, setValue } = useForm()

  // Entonces acá podemos usar el hook useRouter que me da un objeto router que puedo usar para cambiar de página
  // Pero hay que recordar que como acá no tengo una etiqueta link y quero ejecutarlo de manera programada, es decir,
  // que cuando termine de responderme el backen quiero una redirección entonces tenemos que usar este router que hemos 
  // creado
  const router = useRouter()

  // Usamos el useEffect
  useEffect(() => {
    // Cuando el params tenga datos
    if( params.id ){
      // Podemos usar fetch o axios para traer los datos. En este caso usamos axios pero 
      // como estoy dentro de un useEffect y el useEffect no permite usar el await a menos 
      // que cree una función entonces usamos un then()
      axios.get(`/api/tasks/${params.id}`)
           .then( resp => {
            // Cargamos los datos y al usar react hook form tenemos otra función que es el setValue
            // para pasar los datos al formulario y le pasamos como primer parámetro el nombre que 
            // le dimos al registrar el campo en el formulario y como segundo parámetro la data que 
            // le queremos asignar
            setValue('title', resp.data.title);
            setValue('description', resp.data.description);
           } )
    }
  }, []);
  

  // Entonces esta constante que llamamos enviar va a tener la ejecución del handleSubmit
  // y esto nos va a dar los datos (data) y estos datos son justamente los datos que tipea
  // el usuario
  const enviar = handleSubmit( async data => {
    // NOTA: Como estamos usando el mismo componente para crear y editar entonces vamos a condicionar
    //       para validar si la url trae algún parámetro con el fin de ejecutar una cración o actualización
    //       según corresponda
    if(params.id){
      // ACTUALIZA TAREA
      // Usando axios actualizamos y como primer parámetro pasamos la url y como segundo la data
      await axios.put( `/api/tasks/${params.id}`, data );
    } else {
      // CREA TAREA
      // Ahora con la ayuda de la biblioteca axios enviamos los datos al backend
      // y le indicamos la ruta y luego la data (tarea) que queremos enviar.
      // Y al ser una función asíncrona usamos el async y el await
      const resp = await axios.post( 'api/tasks', data );
    }

    // Como mencionamos anteriormente hacemos la redirección luego del posteo de los datos
    // entonces redireccionamos al home o ruta inicial
    router.push('/');
    // Hacemos un refres para revalidar los datos cuando cambie de página
    // Y de esta forma corregir un pequeño bug
    router.refresh();

  });

  return (
    <section className="h-[calc(100vh-7rem)] flex items-center justify-center">

      <form onSubmit={enviar} className='w-1/4'>

        <h1 className='text-3xl font-bold'>
          {/* Colocamos un titulo y lo condicionamos para que diga crear o actualizar según corresponda
              ya que recordemos que estamos usando el mismo formulario para las dos acciones */
            params.id ? "Actualizar Tarea" : "Crear Tarea"
          }
        </h1>

        <label htmlFor="title" className='font-bold text-xs'>
          Escribe un título
        </label>
        <input id='title' type="text" placeholder="Escribe un titulo"
               className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block mb-2 w-full"
               {...register('title')}/>

        <label htmlFor="description" className='font-bold text-xs'>
          Escribe un descripción
        </label>
        <textarea id='description' placeholder="Escribe la descripción de la tarea"
                  className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-black block w-full"
                  {...register('description')}/>

        <div className='flex justify-between'>

          {/* Algo importante es que como vamos a agregar un segundo botón dentro del formulario es necesario indicarle el tipo 
              submit para indicar que este botón es el que ejecuta el evento del formulario */}
          <button className='bg-sky-500 px-3 py-2 rounded-md text-white mt-2'
                  type='submit'>
            {
              /* Hacemos una validación para validar si la url trae parámentro con el fin de cambiar 
              el texto de botón debido a que estamos usando el mismo componente par crear y editar */
              params.id? "Actualizar" : "Crear"
            }
            
          </button>

          {/* Una segunda cosa importante es para que este botón no ejecute el evento submit del formulario le vamos a colocar el tipo botón
              y de esta forma le vamos a decir que este botón hace un click pero no voy a ejecutar el evento del formulario*/}
          <button className='bg-red-500 px-3 py-2 rounded-md text-white mt-2'
                  type='button' 
                  onClick={ async () => {
                    // Podemos colocar una ventana de confirmación usando el confirm
                    if(confirm('¿Está seguro de que desea eliminar la tarea?')){
                      // Y ya con axios podemos llamar la petición que habíamos creado para eliminar
                      await axios.delete(`/api/tasks/${params.id}`);
                      // Y redireccionamos una vez eliminado
                      router.push('/');
                      // Obligamos el refresco para evitar el bug de que el card queda en la vista
                      router.refresh();
                    }
                  }}>
            Eliminar
          </button>

        </div>

      </form>

    </section>
  )
}

export default NewPage