require('colors');

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('=================================='.rainbow);
    console.log('     Seleccione una opcion'.brightBlue);
    console.log('=================================='.rainbow);

    console.log(`${'1.'.brightYellow} ${'Crear tarea'.brightBlue}`);
    console.log(`${'2.'.brightYellow} ${'Listar tareas'.brightBlue}`);
    console.log(
      `${'3.'.brightYellow} ${'Listar tareas completadas'.brightBlue}`
    );
    console.log(
      `${'4.'.brightYellow} ${'Listar tareas pendientes'.brightBlue}`
    );
    console.log(`${'5.'.brightYellow} ${'Completar tarea(s)'.brightBlue}`);
    console.log(`${'6.'.brightYellow} ${'Borrar tarea'.brightBlue}`);
    console.log(`${'0.'.brightYellow} ${'Salir\n'.brightBlue}`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Seleccione una opcion: '.brightBlue, (opt) => {
      resolve(opt);
      readline.close();
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\nPresione ${'ENTER'.brightMagenta} para continuar`,
      () => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
