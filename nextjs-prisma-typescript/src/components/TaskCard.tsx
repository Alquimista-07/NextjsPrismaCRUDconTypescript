//-----------------------------------------------------------------------------------------------
/* Deberíamos crear la interface para indicar el tipo al props de las tareas
   como se muestra a continuación.

   interface Props {
    task: {
        title: string;
        description: string
    };
}

Pero algo genial es que al estar usando Prisma este ya tiene soporte a TypeScript
por lo que yo no tengo que redeclarar y crear la interface, sino que simplemente
importo desde el prisma client la interface de tarea (task). Y esto justamente 
sucede es que cuando creamos el esquema en prisma en el model ya habíamos detallado
todo eso. Y lo que simplemente es crear una interace que recibe la interface de tarea
(Task) desde prisma y ya con esto nos evitamos declara la interface con todos sus atributos
*/
//-----------------------------------------------------------------------------------------------
import { Task } from '@prisma/client';

interface Props {
    task: Task;
}

function TaskCard({ task }: Props) {
  return (
    <div className="bg-gray-900 p-3 hover:bg-gray-800 hover: cursor-pointer">
      <h3 className="font-bold text-xl">{task.title}</h3>
      <p className="text-slate-300">{task.description}</p>
    </div>
  );
}

export default TaskCard;
