/*
 NOTA: Este archivo contiene las rutas de backend para interactuar con la base de datos.
       NesxtJS usa algo que se le conoce enrutamiento por directorios, por lo tanto,
       básicamente al tener carpetas y subcarpetas con archivos y componentes el framework
       se va a encargar de manejarlas por nosotros y gestionar el sistema de enrutamiento.
       Por eso más abajo se muestran un ejemplo de como se haría para acceder a las diferentes
       rutas teniendo en cuenta respectivo método HTTP.
*/

import { NextResponse } from "next/server";

// NOTA: Para hacer que estas rutas funciones nosotros vamos a tener que estar realizando consultas a la base de datos
//       y esto es muy fácil con la ayuda de prisma, y para ello tendríamso que importarlo e instancialo, pero como esto
//       ya lo teníamos en la configuarción previamente que realizamos en el archivo prisma.ts ubicado en el directorio 
//       libs entonces simplemente la usamos
import { prisma } from '@/libs/prisma';

// NOTA: En estas rutas vamos a estar comunicándonos bastante con la base de datos.
//       Por lo tanto acá creamos las rutas disponibles que van a permitir hacer las 
//       operaciones CRUD

//NOTA: Para visualizar esta ruta de backend podemos en la url del navegador
//      indicar el /api/tasks (Ej: http://localhost:3000/api/tasks)
export async function GET() {
    // Ahora podemos usar prisma para hacer la consulta a la base de datos antes de retornar una respuesta.
    // Entonces le vamos a decir con prisma el cual tiene una propiedad llamada task que hace referencia a 
    // la tabla en base de datos que habíamos creado y esto a su vez tiene diversos métodos que podemos usar
    // en este caso como vamos a obtener todo usamos el findMany().
    // Adicionalmente como es una consulta a base de datos, es decir, a un sistema externo es asíncrono por lo
    // tanto vamos a indicar el async y await para que espere la respuesta de los datos antes de continuar.
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
}

export async function POST( request: Request ){
    // De la misma forma como realizamos con el método GET para obtener tareas usamos prisma para 
    // crear una tarea.
    // Creamos una constante que va a hacer la conversión del request a jston y el cual contiene los datos 
    const data = await request.json();
    // Ahora lo que vamos a hacer es guardarlo con la función create, a la cual le decimos que tiene una propiedad
    // data la cual contiene las propieades que vamos a guardar
    const newTask = await prisma.task.create({
        data
    });

    // Retornamos la respuesta al cliente
    return NextResponse.json( newTask );
}