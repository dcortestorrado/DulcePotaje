let productosCarta = [{
    id: 1,
    nombre: "Bocaditos Avena y Banano",
    categoria: "Bocados",
    precio: 10000,
    imagen: "img/bocadoavenabanano.png"
},

{
    id: 2,
    nombre: "Bocaditos Cacao",
    categoria: "Bocados",
    precio: 10500,
    imagen: "img/bocadocacao.png"
},

{
    id: 3,
    nombre: "Bocaditos Mantequilla de Maní",
    categoria: "Bocados",
    precio: 11000,
    imagen: "img/bocadommani.png"
},

{
    id: 4,
    nombre: "Caja 1 Baileys",
    categoria: "Cajas Regalo",
    precio: 65000,
    imagen: "img/cajaregalo1.png"
},

{
    id: 5,
    nombre: "Caja 2 Vino",
    categoria: "Cajas Regalo",
    precio: 55000,
    imagen: "img/cajaregalo2.png"
},

{
    id: 6,
    nombre: "Chocodiscos x5",
    categoria: "Galletas",
    precio: 7500,
    imagen: "img/chocodisco.png"
},

{
    id: 7,
    nombre: "Granola 250gr",
    categoria: "Granola",
    precio: 12000,
    imagen: "img/granola500.png"
},

{
    id: 8,
    nombre: "Granola 500gr",
    categoria: "Granola",
    precio: 20500,
    imagen: "img/granola500.png"
},

{
    id: 9,
    nombre: "Chocobarra x4",
    categoria: "Granola",
    precio: 9500,
    proveedor: "Bavaria",
    imagen: "img/chocobarra.png"
},

{
    id: 10,
    nombre: "Mantequilla de Maní 200gr",
    categoria: "Mantequilla de Maní",
    precio: 9500,
    proveedor: "Bavaria",
    imagen: "img/mantequilla200.png"
},

{
    id: 11,
    nombre: "Mantequilla de Maní 28gr",
    categoria: "Mantequilla de Maní",
    precio: 9500,
    proveedor: "Bavaria",
    imagen: "img/mantequilla28.png"
}

]



function formato_decimal(num) {
return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

if(document.getElementById("mis_productos")){

let contenedor_productos = document.getElementById("mis_productos");


for (const iteracion of productosCarta) {
contenedor_productos.innerHTML += `

<div class="col">
    <div class="card">
        <img src="${iteracion.imagen}" class="card-img-top w-100 img-productos" alt="...">
            <div class="card-body d-flex justify-content-center align-items-center flex-column">
                <h5 class="card-title nombre-tarjetas">${iteracion.nombre}</h5>
                <h6 class="fw-bold nombre-tarjetas">$${formato_decimal(iteracion.precio)}</h6>
                <button type="button" class="btn btn-dark" onclick="agregarAlCarrito(${parseInt(iteracion.id)})">Agregar</button>
            </div>
    </div>
</div>
`
}};

class Carrito {
    constructor() {
        this.productos = []
        this.contador = 0;
        this.total = 0;
    }
    precio_total() {
        let total_cuenta = 0
        this.productos.forEach(function(info_producto) {
            total_cuenta = parseInt(total_cuenta) + parseInt(info_producto.precio)
            
        });
        this.total = total_cuenta;
        return total_cuenta
    }

};

let compras = new Carrito();

if(!parseInt(localStorage.getItem('contadorls'))){
    localStorage.setItem('contadorls', 0);    
    localStorage.setItem('carrito', JSON.stringify(compras.productos));    
} else {
    compras.productos = JSON.parse(localStorage.getItem('carrito'));
    compras.contador = compras.productos.length;
}

document.getElementById('numero-carrito').innerHTML = localStorage.getItem('contadorls');
compras.precio_total();
document.getElementById('total_cuenta_user').innerHTML = `$ ${compras.total}`;


function agregarAlCarrito(id_producto){
    
    console.log(compras.productos);

    for(i=0; i<productosCarta.length; i++){
        if(id_producto === productosCarta[i].id){            
            compras.productos.push(productosCarta[i]);
            compras.contador++;
        }
    }
    
    localStorage.setItem('contadorls', compras.contador);
    document.getElementById("total_cuenta_user").innerHTML = `$ ${formato_decimal(compras.precio_total())}`;
    document.getElementById("numero-carrito").innerHTML = localStorage.getItem('contadorls');
    localStorage.setItem('carrito', JSON.stringify(compras.productos));
}

function vaciarCarrito(){
    if(parseInt(localStorage.getItem('contadorls')) === 0){
        window.location.replace('index.html');
        return;
    }

    for(i = compras.length; i>=0; i--){
        compras.pop();              
    }
    document.getElementById('numero-carrito').innerHTML = 0;
    localStorage.clear();
    localStorage.setItem('contadorls', 0);
    window.location.replace('index.html');
    return;
}


if(document.getElementById('productos_cuenta')){


let contenedor_cuenta = document.getElementById("productos_cuenta");


for (const iteracion of compras.productos){

productos_cuenta.innerHTML += `

<div class="col">
    <div class="card">
        <img src="${iteracion.imagen}" class="card-img-top w-100 img-productos" alt="...">
            <div class="card-body d-flex justify-content-center align-items-center flex-column">
                <h5 class="card-title nombre-tarjetas">${iteracion.nombre}</h5>
                <h6 class="fw-bold nombre-tarjetas">$${formato_decimal(iteracion.precio)}</h6>
            </div>
    </div>
</div>
`
}};
/* 
if(document.getElementById('total_cuenta_user2')){
    compras.precio_total();
    document.getElementById('total_cuenta_user2').innerHTML = `$ ${compras.total}`;
} */