const toggleButton = document.getElementById('dark-mode-toggle');
const nodoPadre = document.getElementById('nodoPadre');

const URL = "http://ip-api.com/json/?fields=regionName,city,zip,query"

const llamadoraGeoLocalizacion = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
}

llamadoraGeoLocalizacion()

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
}

toggleButton.addEventListener('click', toggleDarkMode);

const productosForrajeria = [
    {
        img: "https://cdnx.jumpseller.com/pet-bj/image/30072338/seco_perro_cachorro-min.png?1670389327",
        nombre: "Comida para Perros",
        descripcion: "Bolsa de 10kg de alimento seco.",
        precio: 46000
    },
    {
        img: "https://dojiw2m9tvv09.cloudfront.net/23843/product/M_img-20240404-1045534675.png?49&time=1721093639",
        nombre: "Juguete para Gatos",
        descripcion: "Ratón de peluche con catnip.",
        precio: 7500
    },
    {
        img: "https://aquatropical.net/wp-content/uploads/2021/01/boyu-Ms_1.png",
        nombre: "Pecera de Vidrio",
        descripcion: "Pecera de 20 litros con tapa.",
        precio: 30000
    },
    {
        img: "https://www.relan.cl/cdn/shop/products/pagina-web-20-60384b4f-05f8-4f2b-a08a-2ca49fd905a2.png?v=1669343581",
        nombre: "Cama para Mascotas",
        descripcion: "Cama acolchada de 90cm.",
        precio: 58000
    },
    {
        img: "https://static.miscota.com/media/1/photos/products/424561/correa-flexi-black-design-m-cordon_1_g.png",
        nombre: "Correa Extensible",
        descripcion: "Correa de 5 metros para perros.",
        precio: 15200
    },
    {
        img: "https://feriaonline.co/cdn/shop/files/Comederoautomaticoparamascota8.png?v=1716496483",
        nombre: "Comedero Automático",
        descripcion: "Dispensador automático de comida para perros y gatos.",
        precio: 45000
    },
    {
        img: "https://maderas86.com/wp-content/uploads/2023/06/mueble-arbol-trepador-rascador-para-gato-con-niveles.png",
        nombre: "Cama con rascador para Gatos",
        descripcion: "Mueble de un metro de altura.",
        precio: 950000
    },
    {
        img: "https://casaluna.com.mx/cdn/shop/files/ID_5037_COD_11093_3322018110937_ORTAUNASPERROCHICOOGATONUNBELL_1200x1200.png?v=1684174126",
        nombre: "Cortauñas para mascotas",
        descripcion: "Cortauñas para perros y gatos con lima incluida",
        precio: 12000
    },
    {
        img: "https://i5.walmartimages.com.mx/mg/gm/3pp/asr/c791c0b1-d73b-4b49-bdde-1929e493d53a.167209c3cb3b687c96cda6318c6fe78e.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        nombre: "Transportadora",
        descripcion: "Transportadora mediana para mascotas.",
        precio: 35000
    },
    {
        img: "https://cdn.shopify.com/s/files/1/0566/4391/1854/products/7502279230018_cdcb231a-b9e9-437a-8dc0-9f32b109e06c.png?v=1626656059",
        nombre: "Arena para Gatos",
        descripcion: "Bolsa de 5kg de arena.",
        precio: 10000
    }
];

let carrito = JSON.parse(localStorage.getItem('carritoJson')) || [];

productosForrajeria.forEach((el, index) => {
    nodoPadre.innerHTML += `
            <div class="producto">
                <h2>${el.nombre}</h2>
                <img class="imagenProducto" src="${el.img}"/>
                <p class="descipcion">${el.descripcion}</p>
                <p class="precio">${"$" + el.precio}</p>
                <button type="button" class="boton" data-index="${index}">Agregar al carrito</button>
            </div>`;
});

document.querySelectorAll('.boton').forEach(button => {
    button.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        agregarAlCarrito(index);
    });
});

function agregarAlCarrito(index) {
    const producto = productosForrajeria[index];
    const existe = carrito.some(item => item.nombre === producto.nombre);

    if (existe) {
        carrito = carrito.map(item => {
            if (item.nombre === producto.nombre) {
                item.cantidad++;
            }
            return item;
        });
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carritoJson', JSON.stringify(carrito));
    Swal.fire({
        title: 'Agregado!',
        text: `${producto.nombre} se ha agregado al carrito.`,
        icon: 'success',
        confirmButtonText: 'Continuar comprando'
    })
}

function mostrarCarrito() {
    const modal = document.getElementById('carrito-modal');
    const carritoItems = document.getElementById('carrito-items');
    const totalCarrito = document.getElementById('total-carrito');

    carritoItems.innerHTML = '';

    carrito.forEach((item, index) => {
        const productoHTML = `
                <div class="item-carrito">
                    <img src="${item.img}" alt="${item.nombre}" class="imagenProducto"/>
                    <h4>${item.nombre}</h4>
                    <p>Cantidad: ${item.cantidad} <br>
                    Precio: $${item.precio * item.cantidad}</p>
                    <button class="eliminar-item" data-index="${index}">&times;</button>
                </div>
            `;
        carritoItems.innerHTML += productoHTML;
    });

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    totalCarrito.innerText = `$${total}`;

    modal.style.display = "block";

    document.querySelector('.close-button').addEventListener('click', () => {
        modal.style.display = "none";
    });

    document.querySelectorAll('.eliminar-item').forEach(button => {
        button.addEventListener('click', (e) => {
            eliminarProducto(parseInt(e.target.dataset.index));
        });
    });
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carritoJson', JSON.stringify(carrito));
    mostrarCarrito();
}

document.getElementById('open-carrito').addEventListener('click', mostrarCarrito);