require('colors');

const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    // TODO: cargarTareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '0':
        break;

      case '1':
        // Crear tarea
        const desc = await leerInput(`Descripcion:`);
        tareas.crearTarea(desc);
        break;

      case '2':
        // Listar tareas
        tareas.listadoCompleto();
        break;

      case '3':
        // Listar tareas completadas
        tareas.listarPendientesCompletadas();
        break;

      case '4':
        // Listar tareas pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case '5':
        // Completar tarea(s)
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case '6':
        // Borrar tarea
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id === '0') break;
        // TODO: preguntar si esta seguro
        const ok = await confirmar('Estas seguro?');
        if (ok) tareas.borrarTarea(id);
        break;

      default:
        console.error('Tu no deberias estar aqui');
        break;
    }

    guardarDB(tareas.listadoArr);

    console.log();
    await pausa();
  } while (opt !== '0');
};

main();
