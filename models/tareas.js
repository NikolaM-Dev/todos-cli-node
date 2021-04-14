require('colors');

const Tarea = require('./tarea');

/**
 * _listado:
 * { 'uuid-123131-1231231: { id: 12, desc: asd, compleatadoEn: 92231 } }
 */

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) =>
      listado.push(this._listado[key])
    );

    return listado;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  // 1. tarea.desc :: Completada(verde) | pendiente(rojo)
  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn
        ? 'Completada'.brightGreen
        : 'Pendiente'.brightRed;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 1;

    this.listadoArr.forEach((tarea) => {
      const idx = `${contador}.`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn
        ? 'Completada'.brightGreen
        : 'Pendiente'.brightRed;

      if (completadas && completadoEn) {
        console.log(`${idx} ${desc} :: ${completadoEn.brightGreen}`);
        contador++;
      }

      if (completadas === false && completadoEn === null) {
        console.log(`${idx} ${desc} :: ${estado}`);
        contador++;
      }
    });
  }

  borrarTarea(id = '') {
    if (this._listado[id]) delete this._listado[id];
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) this._listado[tarea.id].completadoEn = null;
    });
  }
}

module.exports = Tareas;
