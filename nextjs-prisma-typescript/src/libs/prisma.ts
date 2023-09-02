// NOTA: Archivo que maneja la conexión con la base de datos

import {PrismaClient} from '@prisma/client';

// NOTA:Creamos una instancia la cual va a devolver un objeto que vamos a guardar en
//      una constante
export const prisma = new PrismaClient();

// NOTA: Y acá ya con esto puedo interactuar con las tablas de la base de datos
//       ya que por ejeplo podemos hacer uso de los diferentes métodos, como buscar,
//       actualizar y demás.