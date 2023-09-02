/*
 NOTA: Este archivo contiene las rutas de backend para interactuar con la base de datos.
       NesxtJS usa algo que se le conoce enrutamiento por directorios, por lo tanto,
       básicamente al tener carpetas y subcarpetas con archivos y componentes el framework
       se va a encargar de manejarlas por nosotros y gestionar el sistema de enrutamiento.
       Por eso más abajo se muestran un ejemplo de como se haría para acceder a las diferentes
       rutas teniendo en cuenta respectivo método HTTP.
*/

import { NextResponse } from "next/server";

// NOTA: En estas rutas vamos a estar comunicándonos bastante con la base de datos.
//       Por lo tanto acá creamos las rutas disponibles que van a permitir hacer las 
//       operaciones CRUD

//NOTA: Para visualizar esta ruta de backend podemos en la url del navegador
//      indicar el /api/tasks (Ej: http://localhost:3000/api/tasks)
export function GET() {
    return NextResponse.json('Obteniendo tareas');
}

export function POST(){
    return NextResponse.json('Creando tarea');
}