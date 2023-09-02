// NOTA: Este archivo contiene las rutas de backend para interactuar con la base de datos.
//       Ahora como sabemos que NextJS usa el sistema de enrutamiento por directorios también
//       podríamos necesitar obtener una sola tarea de forma individual por su respectivo id.
//       Por lo tanto sabiendo lo del enrutamiento por directorios para este caso cuando necesitamos
//       una sola tarea entonces necesitamos crear una ruta, o directorio llamado en este caso [id] 
//       y dentro de este vamos a usar este nuevo archivo route.ts que se va a encargar de tener
//       la logica para la gestión de los datos.

import { NextResponse } from "next/server";

// NOTA: Para hacer que estas rutas funciones nosotros vamos a tener que estar realizando consultas a la base de datos
//       y esto es muy fácil con la ayuda de prisma, y para ello tendríamso que importarlo e instancialo, pero como esto
//       ya lo teníamos en la configuarción previamente que realizamos en el archivo prisma.ts ubicado en el directorio 
//       libs entonces simplemente la usamos
import { prisma } from '@/libs/prisma';

// NOTA: En este caso si recordamos cuando ejecutamos este método GET, me da información de un request
//       al cual le indicamos su tipo de dato (Request que es una interface global que ya esta disponible
//       entonces simplemente la utilizamos) pero también puedo acceder al params y este params es el que 
//       obtiene el id o valor que se va a estar pasando.

// Aclaración: Cuando colocamos el código { params: { id: string } lo que indica es que params es un
//             objeto y dentro de ese objeto también tiene una propiedad id y esa propidad id es de tipo string
interface Params {
    params: { id: string }
}

//       Accederíamos a esta ruta a través de /api/tasks/:id con su petición GET
//       (Ej: http://localhost:3000/api/tasks/1)
export async function GET( request: Request, { params }: Params ){
    // Usamos prisma para las intraciones con la base de datos teniendo en cuenta el tema del async y await
    // mencionado en los comentarios realizados en el archivo route.ts de la ruta api/tasks y que tiene el
    // obtener tareas y crear tarea.
    // Ahora acá en este caso como queremos obtener solo una tarea usamos es el método findFirst y el cual
    // recibe un objeto por parámetro con una propiedad where en donde podemos decirle que compare algún campo
    // en este caso es el id que viene por parámetro el cual lo tenemos que transformar a número ya que en el
    // shema definimos que era Int
    const task = await prisma.task.findFirst({
        where: { id: Number(params.id) }
    })
    return NextResponse.json( task );
}

// Función para actualizar una tarea
export function PUT( request: Request, { params }: Params ){
    return NextResponse.json("Actualizando tarea " + params.id);
}

// Función para eliminar una tarea
export function DELETE( request: Request, { params }: Params ) {
    return NextResponse.json("Eliminando tarea " + params.id);
}