/*
 NOTA: Este archivo contiene las rutas de backend
*/

import { NextResponse } from "next/server";

// En estas rutas vamos a estar comunicándonos bastante con la base de datos

//NOTA: Para visualizar esta ruta de backend podemos en la url del navegador
//      indicar el /api/tasks (Ej: http://localhost:3000/api/tasks)
export function GET() {
    return NextResponse.json('Obteniendo tareas');
}