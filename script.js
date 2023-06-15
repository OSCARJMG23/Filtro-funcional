/* *******************Gestion de Clientes ************************** */


//Buscador 
const buscador = document.getElementById('buscador')
buscador.addEventListener('input', e => {
    const textoBuscado = e.target.value.toLowerCase(); //.tolowerCase()

    document.querySelectorAll('#filaCliente').forEach(fila => {
        const primeraCelda =  fila.querySelector('#idCedula');
        const nonmbreBus = fila.querySelector('#idNombres')
        const apellidoBus = fila.querySelector('#idApellidos')
        console.log(primeraCelda);
      const textoCelda = primeraCelda.textContent.toLowerCase();
      const textoNombre = nonmbreBus.textContent.toLowerCase();
      const textoApellido = apellidoBus.textContent.toLowerCase()

      if (textoCelda.includes(textoBuscado) || textoNombre.includes(textoBuscado)|| textoApellido.includes(textoBuscado)) {
        fila.classList.remove('filtro');
      } else {
        fila.classList.add('filtro');
      }
    });
  })

var listaClientes = []
let editando = false
let indiceEditando = -1 

const formulario = document.getElementById("formularioCliente")
const cedula = document.getElementById("cedula")
const nombres = document.getElementById("nombres")
const apellidos = document.getElementById("apellidos")
const placaVehiculo = document.getElementById("placaV")
const tipoVehiculo = document.getElementById("tipo-Vehiculo")
const correo = document.getElementById("correo")
const telefono = document.getElementById("telefono")
const tablaPadreC = document.getElementById("padreClientes")
const botonSubmit = formulario.querySelector('button[type="submit"]');

formulario.addEventListener('submit',function(event){
    event.preventDefault()

    if(editando){
        actualizarCliente()
    } else{
        agregarCliente()
    }

    formulario.reset()
})


function agregarCliente(){
    var nuevoCliente = {}

    nuevoCliente.cedulaN = cedula.value
    nuevoCliente.nombresN = nombres.value
    nuevoCliente.apellidosN = apellidos.value
    nuevoCliente.placaN = placaVehiculo.value
    nuevoCliente.tipoVN = tipoVehiculo.value
    nuevoCliente.correoN = correo.value
    nuevoCliente.telefonoN = telefono.value
    nuevoCliente.puntosN = 0

    listaClientes.push(nuevoCliente)
    //listarClientes
    listarDatos()
    //CrearSelect
    CrearSelectCliente()
}
function actualizarCliente(){
    var clienteEditando = listaClientes[indiceEditando]
    clienteEditando.cedulaN = cedula.value
    clienteEditando.nombresN = nombres.value
    clienteEditando.apellidosN = apellidos.value
    clienteEditando.placaN = placaVehiculo.value
    clienteEditando.tipoVN = tipoVehiculo.value
    clienteEditando.correoN = correo.value
    clienteEditando.telefonoN = telefono.value

    //ListarClientes
    listarDatos()
    //EditarFin
    editarFin()
    //crear Select
    CrearSelectCliente()
    //puntos Cliente
    puntosCliente()
}

function editarCliente(index){
    indiceEditando = index;
    var clienteEditando = listaClientes[indiceEditando]

    cedula.value = clienteEditando.cedulaN
    nombres.value = clienteEditando.nombresN
    apellidos.value = clienteEditando.apellidosN
    placaVehiculo.value = clienteEditando.placaN
    tipoVehiculo.value = clienteEditando.tipoVN
    correo.value = clienteEditando.correoN
    telefono.value = clienteEditando.telefonoN

    botonSubmit.innerHTML = 'Actualizar'
    editando = true
}
function editarFin(){
    indiceEditando = -1
    botonSubmit.innerHTML = 'Registrar'
    editando = false
}

function listarDatos(){
    tablaPadreC.innerHTML= ''

    listaClientes.forEach((e,index)=>{
        let hijoC  = document.createElement('tr')
        hijoC.classList.add('table-secondary', 'tabla');
        hijoC.id = 'filaCliente';

        let numeroC = document.createElement('td')
        numeroC.textContent = index + 1
        hijoC.appendChild(numeroC)

        let cedulaCelda = document.createElement('td')
        cedulaCelda.textContent = e.cedulaN
        hijoC.appendChild(cedulaCelda)
        cedulaCelda.id = 'idCedula'

        let nombresCelda = document.createElement('td')
        nombresCelda.textContent = e.nombresN
        hijoC.appendChild(nombresCelda)
        nombresCelda.id = 'idNombres'

        let apellidosCelda = document.createElement('td')
        apellidosCelda.textContent = e.apellidosN
        hijoC.appendChild(apellidosCelda)
        apellidosCelda.id = 'idApellidos'

        let placaCelda = document.createElement('td')
        placaCelda.textContent = e.placaN
        hijoC.appendChild(placaCelda)

        let tipoVCelda = document.createElement('td')
        tipoVCelda.innerHTML = e.tipoVN
        hijoC.appendChild(tipoVCelda)

        let correoCelda = document.createElement('td')
        correoCelda.textContent = e.correoN
        hijoC.appendChild(correoCelda)

        let telefonoCelda = document.createElement('td')
        telefonoCelda.textContent = e.telefonoN
        hijoC.appendChild(telefonoCelda)


        let opcionB = document.createElement('td')
        botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.classList.add('btn', 'btn-primary');
        botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.classList.add('btn', 'btn-danger');
        opcionB.appendChild(botonEditar)
        opcionB.appendChild(botonEliminar)
        hijoC.appendChild(opcionB)

        tablaPadreC.appendChild(hijoC)

        botonEliminar.addEventListener('click', function(){
            eliminarCliente(index)
        });
        botonEditar.addEventListener('click', function(){
            editarCliente(index)
        })
    })
}
function eliminarCliente(index){
    listaClientes.splice(index, 1)
    listarDatos()
    CrearSelectCliente()
    puntosCliente()
}

/* ******************* Gestion de Servicios ************************** */
const formularioServi = document.getElementById('formularioServicio')
const nombreServi = document.getElementById('nombreServi')
const valorServi = document.getElementById('valorServi')
const descServi = document.getElementById('descripcionServi')
const punstosServi = document.getElementById('puntosServi')
const tablaPadreServi = document.getElementById('padreServicios')

formularioServi.addEventListener('submit', function(event){
    event.preventDefault()
    agregarServicio()
    formularioServi.reset()
    CrearSelectServicio()
})

var servicios = []

function agregarServicio(){
    var nuevoServicio = {}

    nuevoServicio.nombreServiN = nombreServi.value
    nuevoServicio.valorServiN = valorServi.value
    nuevoServicio.descripSN = descServi.value
    nuevoServicio.puntosServiN = punstosServi.value

    servicios.push(nuevoServicio)
    listarServicios()
}

function listarServicios(){
    tablaPadreServi.innerHTML = ''

    servicios.forEach((e,index)=>{
        let hijoS = document.createElement('tr')
        hijoS.classList.add('table-secondary', 'tabla');

        let idServicio = document.createElement('td')
        idServicio.textContent = index + 1
        hijoS.appendChild(idServicio)

        let nombreScelda = document.createElement('td')
        nombreScelda.textContent = e.nombreServiN
        hijoS.appendChild(nombreScelda)

        let valorScelda = document.createElement('td')
        valorScelda.textContent = e.valorServiN
        hijoS.appendChild(valorScelda)

        let descripScelda = document.createElement('td')
        descripScelda.textContent = e.descripSN
        hijoS.appendChild(descripScelda)

        let puntosScelda = document.createElement('td')
        puntosScelda.textContent = e.puntosServiN
        hijoS.appendChild(puntosScelda)

        let opcionBservi = document.createElement('td')
        botonEliminarServi = document.createElement('button')
        botonEliminarServi.textContent = 'Eliminar'
        opcionBservi.appendChild(botonEliminarServi)
        hijoS.appendChild(opcionBservi)

        tablaPadreServi.appendChild(hijoS)

        botonEliminarServi.addEventListener('click', function(){
            eliminarServicio(index)
        })

    })
}

function eliminarServicio(index){
    servicios.splice(index, 1)
    listarServicios()
    CrearSelectServicio()
}

/* ******************* Gestion de Compras ************************** */
const formularioCompras = document.getElementById('comprasServicios')
const selectCliente = document.getElementById('selectCliente')
const selectServicio = document.getElementById('selectServicio')


formularioCompras.addEventListener('submit',function(event){
    event.preventDefault()

    let cedula = ''
    let valorS = 0
    let puntosS = 0

    let desc = 0.06
    let iva = 0.14

    for(let servicio of servicios){
        if(servicio.nombreServiN == selectServicio.value){
            valorS = parseFloat(servicio.valorServiN) 
            puntosS = parseFloat(servicio.puntosServiN)

            valorDesc = parseFloat(valorS*desc)
            valorTotalDesc = parseFloat(valorS-valorDesc)
            valorTotal = parseFloat(valorS * iva)
            totalPagar = parseFloat(valorTotalDesc + valorTotal)
            
        }    
    }

    for(let cliente of listaClientes){
        if(cliente.nombresN == selectCliente.value){
            cedula = cliente.cedulaN
            cliente.puntosN += puntosS
        }
    }
    
    
    alert(`******* Campus Car Washing Center *******
        Id de Usuario: ${cedula}
        Nombres: ${selectCliente.value}
        Nombre del Servicio: ${selectServicio.value}
        Valor total con descuento: ${valorTotalDesc}
        Valor total a pagar con Tax: ${totalPagar}
        Puntos recibidos: +${puntosS}`)


        
    puntosCliente()
})

function CrearSelectCliente(){
    selectCliente.innerHTML= '<option selected>Cliente</option>'
    for(let cliente of listaClientes){
        if(listaClientes.length===0){
            return
        }
        const crearOpcCliente = document.createElement('option')
        crearOpcCliente.textContent= cliente.nombresN
        selectCliente.appendChild(crearOpcCliente)
    }
}
function CrearSelectServicio(){
    selectServicio.innerHTML = '<option selected>Servicio</option>'
    for(let servicio of servicios){
        if(servicios.length === 0){
            return
        }
        const crearOpcServicio = document.createElement('option')
        crearOpcServicio.textContent = servicio.nombreServiN
        selectServicio.appendChild(crearOpcServicio)
    }
}

/* ******************* Fidelizacion Cliente ************************** */
const padreTablaPuntos = document.getElementById('puntos-Clientes')

function puntosCliente(){
    padreTablaPuntos.innerHTML=''

    for(let cliente of listaClientes){
        if(cliente.puntosN != 0){
            const filaPuntos = document.createElement('tr')
            filaPuntos.innerHTML = `<td>${cliente.nombresN}</td>
            <td>${cliente.apellidosN}</td>
            <td>${cliente.puntosN}</td>`
            padreTablaPuntos.appendChild(filaPuntos)
        }
    }
}