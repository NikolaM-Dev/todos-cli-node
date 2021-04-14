const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Que deseas hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.brightYellow} Crear tarea`,
      },
      {
        value: '2',
        name: `${'2.'.brightYellow} Listar tareas`,
      },
      {
        value: '3',
        name: `${'3.'.brightYellow} Listar tareas completadas`,
      },
      {
        value: '4',
        name: `${'4.'.brightYellow} Listar tareas pendientes`,
      },
      {
        value: '5',
        name: `${'5.'.brightYellow} Completar tarea(s)`,
      },
      {
        value: '6',
        name: `${'6.'.brightYellow} Borrar tarea`,
      },
      {
        value: '0',
        name: `${'0.'.brightYellow} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('=================================='.rainbow);
  console.log('     Seleccione una opcion'.brightBlue);
  console.log('==================================\n'.rainbow);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const pregunta = [
    {
      type: 'input',
      name: 'enter',
      message: `Presiona ${'ENTER'.brightMagenta} para continuar`,
    },
  ];

  await inquirer.prompt(pregunta);
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message: message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.brightGreen;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc} `,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.brightGreen + ' Cancelar',
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  console.log();

  const pregunta = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
