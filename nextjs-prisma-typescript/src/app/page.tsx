// Importamos la libraría axios para el manejo de las peticiones para el ejemplo del primer
// enfoque o forma de traer los datos que se explica más abajo
import axios from "axios"

// Importamos la prisma para el traer los datos desde la base de datos para el ejemplo del segundo
// enfoque o forma de traer los datos que se explica más abajo.
import { prisma } from '@/libs/prisma';

// Importación de TaskCard el cual lo convertimos en un componente individual
// para pasarlo al Homepage
import TaskCard from '@/components/TaskCard';

// Función para traer los datos desde la BD
async function loadTasks(){
  // Acá tenemos varias formas de poder pedir los datos, como esto es código de backend
  // podemos hacer la petición http, una query de la base de datos es decir consultar la 
  // base de datos directamente o incluso podría hacer cualquier tipo de operación como
  // consultar archivos (load from local storage).

  // En este caso ya tendríamos una api creada y podemos usarlo o también podemos llamar prisma.
  // Entonces acá vamos a usar ambos enfoques o ejemplos.

  //----------------------------------------
  // Haciendo la petición http con axios
  //----------------------------------------
  // Para el primer enfoque o ejemplo usando axios como vamos a pedir datos usamos el get pero acá tenemos que pasar la direción completa
  // a diferencia de como usamos en el new y esto es porque en el new al ser un componente cliente el navegador le autocompleta la dirección 
  // url. Pero acá al ser componente del servidor, es decir, código de backend no conoce la dirección, es decir, nadie le va a autocompletar
  // la dirección.

  const resp = await axios.get('http://localhost:3000/api/tasks');
  //console.log(resp);

  //-----------------------------------------------------------
  // Haciendo la consulta directamente el la BD con Prisma
  //-----------------------------------------------------------
  // Para el segundo enfoque o ejemplo podemos usar directamente prisma para hacer el quer y a la base de datos ya que como se mencinó antreriormente
  // acá tenemos código de backend por lo tanto para hacer esta tarea lo que realizaríamos es importar prisma y luego realizar la consulta usando una
  // de las funciones que nos provee prisma para traer todos los datos y lo haríamos de la siguiente forma:
  
  const tasks = await prisma.task.findMany();
  //console.log(tasks);

  // Para continuar con el ejemplo voy a usar el enfoque o forma de traer los datos usanso prisma
  // pero cabe aclarar que también podemos usar axios con alguna variante al momento de mostrar los
  // datos en la vista ya que el objeto que se defuelve es diferente en las dos formas como se explico
  // anteriormente. Entonces retornamos las tareas (tasks) y al ser asíncrona recordamos usar el async 
  // y await.
  return tasks;

}

async function HomePage() {
  // Y a HomePage simplemente le decimos que ejecute la función loadTasks
  const tasks = await loadTasks()
  //console.log(tasks);

  // Y de esta forma ya tenemos los datos por lo tanto podemos recorrerlos para cargarlos en la vista
  return (
    <div className="grid grid-cols-3 gap-3 mt-5">
      { tasks.map(task => (
      <TaskCard task={task}  key={task.id} />
    )) }
    </div>
  )
}

export default HomePage