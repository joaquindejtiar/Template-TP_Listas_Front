/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;
    mostrarComidasConForEach(comidas);                   // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function mostrarComidasConForEach (listas) {

  container.innerHTML = ''

  listas.forEach( comida => {
    container.innerHTML += 
`
<article class="card">
   <h2 class="ElAcheDos">${comida.nombre} </h2>
   <p>${comida.provincia} </p>
   <span>${comida.categoria} </span>
   <ul>
   ${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
   </ul>
</article>

`
  })
}

const agregarComidaForm = document.getElementById("agregarComidaForm")

agregarComidaForm.addEventListener("submit", (event) => {
event.preventDefault()
  //alert("Comida agregada: " + event.target.nombre.value);

  let nuevaComida = {
    nombre: event.target.nombre.value,
    provincia: event.target.provincia.value,
    categoria: event.target.categoria.value,
    ingredientes: event.target.ingredientes.value.split(","),
  }

  comidas.push(nuevaComida)

  mostrarComidasConForEach(comidas)

  event.target.reset()
})

const filtroCategoria = document.getElementById("filtroCategoria")
const filtroProvincia = document.getElementById("fitroProvincia")
const busqueda = document.getElementById("buscador")

function filtrar () {
  
  let comidasFiltradas = comidas.filter( comida => {
    return comida.categoria.includes(filtroCategoria.value)
    && comida.provincia.includes(filtroProvincia.value)
  })

  mostrarComidasConForEach(comidasFiltradas)
}

function buscar (){
  let comidasFiltradas = comidas.filter( comida => {
    return comida.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
     || comida.provincia.toLowerCase().includes(busqueda.value.toLowerCase())
     || comida.categoria.toLowerCase().includes(busqueda.value.toLowerCase())
  } )
console.log(comidasFiltradas)
  mostrarComidasConForEach(comidasFiltradas)
}

filtroCategoria.addEventListener("change", filtrar)
filtroProvincia.addEventListener("change", filtrar)
busqueda.addEventListener("input", buscar)


