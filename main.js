const boton_agregar = document.getElementById('boton-agregar');
const lista_tareas = document.querySelector('.lista-tareas');
const boton_limpiar = document.querySelector('.boton-limpiar');

let arregloTareas = [];
let contador = 0;


inicilizarContador();
listarTareas();

//  agregar nueva tarea vacía
boton_agregar.addEventListener('click', () => {
  agregarTarea("");
  listarTareas();
});

// limpiar todas las tareas
boton_limpiar.addEventListener('click', () => {
  if (confirm("¿Deseas eliminar todas las tareas?")) {
    limpiarTodo();
    alert(" Lista vaciada.");
  }
});

//  eliminar tarea
lista_tareas.addEventListener('click', (event) => {
  if (event.target.classList.contains('boton-eliminar')) {
    const id = event.target.parentElement.id;
    eliminarTarea(id);
  }
});

//  editar tarea 
lista_tareas.addEventListener('keypress', (event) => {
  if (event.key === "Enter") {
    const id = event.target.parentElement.id;
    editarTarea(id, event.target.value);
  }
});



function getContador() {
  return localStorage.getItem("contador");
}

function setContador() {
  localStorage.setItem("contador", contador);
}

function inicilizarContador() {
  if (getContador() != null) {
    contador = parseInt(getContador());
  }
}

function getArregloTareas() {
  return JSON.parse(localStorage.getItem("arregloTareas"));
}

function setArregloTareas() {
  localStorage.setItem("arregloTareas", JSON.stringify(arregloTareas));
  listarTareas();
}

function agregarTarea(descripcion) {
  contador++;
  const objTarea = { id: contador, descripcion };
  if (getArregloTareas() != null) {
    arregloTareas = getArregloTareas();
  }
  arregloTareas.push(objTarea);
  setArregloTareas();
  setContador();
}

function listarTareas() {
  lista_tareas.innerHTML = '';
  const datos = getArregloTareas();
  if (datos != null) {
    for (const tarea of datos.reverse()) {
      lista_tareas.innerHTML += `
        <li id="${tarea.id}">
          <input type="text" class="input-tarea" value="${tarea.descripcion}" placeholder="Escribe una tarea...">  
          <button class="boton-eliminar"><i class="fa-solid fa-xmark"></i></button>
        </li>
      `;
    }
  }
}

function editarTarea(idTarea, descripcion) {
  const newTarea = { id: parseInt(idTarea), descripcion };
  const datos = getArregloTareas();
  const newArreglo = datos.map(tarea => tarea.id == idTarea ? newTarea : tarea);
  arregloTareas = newArreglo;
  setArregloTareas();
}

function eliminarTarea(idTarea) {
  const datos = getArregloTareas();
  arregloTareas = datos.filter(tarea => tarea.id != idTarea);
  setArregloTareas();
}

function limpiarTodo() {
  arregloTareas = [];
  contador = 0;
  setArregloTareas();
  setContador();
}
