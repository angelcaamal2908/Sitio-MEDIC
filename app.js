let productos = []; 
let categoriaActual = 'todos';
let carrito = [];

// Variables de Paginación
let paginaActual = 1;
const productosPorPagina = 8; 

// --- 1. CARGA DEL JSON ---
async function cargarInventario() {
    try {
        const respuesta = await fetch('inventario_export.json');
        if (!respuesta.ok) throw new Error('No se pudo leer el archivo JSON');
        const datosJSON = await respuesta.json();
        
        productos = datosJSON.map((prod, index) => {
            const categoriaTexto = (prod.categoria || '').toLowerCase();
            const esMedicamento = categoriaTexto.includes('analgesia') || categoriaTexto.includes('medic') || categoriaTexto.includes('farma');
            return {
                id: index + 1, 
                nombre: prod.nombre,
                marca: prod.marca ? prod.marca : 'Genérico',
                categoriaFiltro: esMedicamento ? 'medicamento' : 'miscelaneo',
                categoriaReal: prod.categoria || 'General'
            };
        });

        const btnTodos = document.querySelector('.btn-filter');
        cambiarCategoria('todos', btnTodos);
    } catch (error) {
        console.error("Error al cargar el inventario:", error);
        document.getElementById('product-grid').innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3 style="color: #ef4444;">Error de carga</h3>
                <p>Asegúrate de estar usando un servidor local (Live Server) para leer el archivo inventario_export.json.</p>
            </div>`;
    }
}

// --- 2. FILTROS Y VISTA ---
function cambiarCategoria(categoria, elementoBoton) {
    categoriaActual = categoria;
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active-filter'));
    if(elementoBoton) elementoBoton.classList.add('active-filter');
    aplicarFiltros(true); 
}

function aplicarFiltros(reiniciarPagina = false) {
    if (reiniciarPagina) paginaActual = 1;

    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = ''; 
    const textoBusqueda = document.getElementById('searchBar').value.toLowerCase();

    const productosFiltrados = productos.filter(prod => {
        const coincideCategoria = categoriaActual === 'todos' || prod.categoriaFiltro === categoriaActual;
        const coincideTexto = prod.nombre.toLowerCase().includes(textoBusqueda) || 
                              prod.marca.toLowerCase().includes(textoBusqueda) ||
                              prod.categoriaReal.toLowerCase().includes(textoBusqueda);
        return coincideCategoria && coincideTexto;
    });

    if (productosFiltrados.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;"><i class="fa-solid fa-box-open" style="font-size: 3.5rem; color: #cbd5e1; margin-bottom: 15px;"></i><h3 style="color: #475569; margin-bottom: 5px;">No encontramos lo que buscas</h3></div>`;
        document.getElementById('pagination-controls').innerHTML = '';
        return;
    }

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosDeEstaPagina = productosFiltrados.slice(inicio, fin);

    productosDeEstaPagina.forEach((prod, index) => {
        const badgeHTML = prod.categoriaFiltro === 'medicamento' 
            ? `<span class="badge badge-med" style="background:#eff6ff; color:#2563eb; padding:6px 10px; border-radius:6px; font-size:0.75rem; font-weight:600;"><i class="fa-solid fa-prescription-bottle-medical"></i> ${prod.categoriaReal}</span>`
            : `<span class="badge badge-misc" style="background:#fef3c7; color:#d97706; padding:6px 10px; border-radius:6px; font-size:0.75rem; font-weight:600;"><i class="fa-solid fa-tags"></i> ${prod.categoriaReal}</span>`;

        const card = document.createElement('div');
        card.className = 'card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <div style="margin-bottom: 15px;">${badgeHTML}</div>
            <h3 style="margin: 0 0 10px 0; font-size: 1.15rem; color: #0f172a;">${prod.nombre}</h3>
            <p style="color: #64748b; font-size: 0.9rem; flex-grow: 1;"><i class="fa-solid fa-building" style="color: #cbd5e1; margin-right: 5px;"></i> ${prod.marca}</p>
            <button class="btn-add-cart" onclick="agregarAlCarrito(${prod.id}, '${prod.nombre.replace(/'/g, "\\'")}')"><i class="fa-solid fa-cart-plus"></i> Añadir</button>
        `;
        grid.appendChild(card);
    });

    renderizarPaginacion(productosFiltrados.length);
}

function renderizarPaginacion(totalProductos) {
    const container = document.getElementById('pagination-controls');
    container.innerHTML = '';
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
    if (totalPaginas <= 1) return; 

    const btnPrev = document.createElement('button');
    btnPrev.className = 'page-btn';
    btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    btnPrev.disabled = paginaActual === 1;
    btnPrev.onclick = () => { paginaActual--; aplicarFiltros(); document.getElementById('inicio-catalogo').scrollIntoView(); };
    container.appendChild(btnPrev);

    for (let i = 1; i <= totalPaginas; i++) {
        const btnNum = document.createElement('button');
        btnNum.className = `page-btn ${paginaActual === i ? 'active' : ''}`;
        btnNum.innerText = i;
        btnNum.onclick = () => { paginaActual = i; aplicarFiltros(); document.getElementById('inicio-catalogo').scrollIntoView(); };
        container.appendChild(btnNum);
    }

    const btnNext = document.createElement('button');
    btnNext.className = 'page-btn';
    btnNext.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    btnNext.disabled = paginaActual === totalPaginas;
    btnNext.onclick = () => { paginaActual++; aplicarFiltros(); document.getElementById('inicio-catalogo').scrollIntoView(); };
    container.appendChild(btnNext);
}

// --- 3. FUNCIONES DEL CARRITO ---
function mostrarToast(mensaje) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: #4ade80;"></i> ${mensaje}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function agregarAlCarrito(idProducto, nombreProducto) {
    const producto = productos.find(p => p.id === idProducto);
    const itemEnCarrito = carrito.find(item => item.id === idProducto);
    if (itemEnCarrito) { itemEnCarrito.cantidad++; } else { carrito.push({ ...producto, cantidad: 1 }); }
    actualizarInterfazCarrito();
    mostrarToast(`${nombreProducto} añadido`);
    const badge = document.getElementById('cartCount');
    badge.style.animation = 'none';
    setTimeout(() => badge.style.animation = 'pop 0.3s ease-out', 10);
}

function cambiarCantidad(idProducto, cambio) {
    const item = carrito.find(item => item.id === idProducto);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) carrito = carrito.filter(p => p.id !== idProducto);
        actualizarInterfazCarrito();
    }
}

function actualizarInterfazCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cartCount').innerText = totalItems;
    const contenedor = document.getElementById('cartItemsContainer');
    
    if (carrito.length === 0) {
        contenedor.innerHTML = `<div style="text-align:center; padding: 30px 0;"><i class="fa-solid fa-basket-shopping" style="font-size: 3rem; color: #e2e8f0; margin-bottom: 10px;"></i><p style="color:#64748b; margin: 0;">Tu carrito está vacío.</p></div>`;
        return;
    }

    contenedor.innerHTML = '';
    carrito.forEach(item => {
        contenedor.innerHTML += `
            <div class="cart-item">
                <div style="flex-grow: 1; padding-right: 15px;">
                    <strong style="color: #334155; font-size: 0.95rem;">${item.nombre}</strong>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                    <span style="width: 20px; text-align: center; font-weight: 600; color: #0f172a; font-size: 0.9rem;">${item.cantidad}</span>
                    <button class="qty-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                </div>
            </div>`;
    });
}

function abrirCarrito() {
    const modal = document.getElementById('cartModal');
    const content = document.getElementById('cartContent');
    modal.style.display = 'flex';
    modal.style.animation = 'modalFadeIn 0.3s forwards';
    content.style.animation = 'slideUpCart 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
}

function cerrarCarrito() {
    const modal = document.getElementById('cartModal');
    modal.style.animation = 'modalFadeIn 0.3s reverse forwards';
    setTimeout(() => modal.style.display = 'none', 300);
}

// --- 4. NUEVA FUNCIÓN: GENERAR TICKET EN IMAGEN ---
function descargarPedidoImagen() {
    if (carrito.length === 0) { mostrarToast("Agrega productos primero"); return; }
    
    mostrarToast("Generando imagen...");

    // 1. Creamos un "Ticket" virtual (Oculto en el fondo para que el usuario no lo vea)
    const ticket = document.createElement('div');
    ticket.style.width = '350px';
    ticket.style.padding = '30px';
    ticket.style.background = '#ffffff';
    ticket.style.color = '#0f172a';
    ticket.style.fontFamily = 'Inter, sans-serif';
    ticket.style.position = 'fixed'; 
    ticket.style.top = '0';
    ticket.style.left = '0';
    ticket.style.zIndex = '-1000'; // Detrás de todo
    
    const fecha = new Date().toLocaleDateString('es-MX');

    let itemsHTML = '';
    carrito.forEach(item => {
        itemsHTML += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
            <span style="font-weight: bold; color: #2563eb; width: 30px;">${item.cantidad}x</span>
            <span style="flex-grow: 1; font-size: 0.95rem;">${item.nombre}</span>
        </div>`;
    });

    ticket.innerHTML = `
        <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="margin: 0; color: #0f172a; font-size: 1.8rem;">AC Digital</h2>
            <p style="margin: 5px 0 0 0; font-size: 1rem; color: #64748b;">Ticket de Pedido</p>
            <p style="margin: 5px 0 0 0; font-size: 0.85rem; color: #94a3b8;">Fecha: ${fecha}</p>
        </div>
        <div style="margin-bottom: 25px;">
            ${itemsHTML}
        </div>
        <div style="text-align: center; margin-top: 25px; padding-top: 15px; border-top: 2px solid #f1f5f9;">
            <p style="margin: 0; font-size: 0.9rem; color: #64748b;">Por favor, envía esta imagen al WhatsApp:</p>
            <p style="margin: 5px 0 0 0; font-weight: bold; color: #25D366; font-size: 1.2rem;">+52 986 108 0128</p>
        </div>
    `;

    document.body.appendChild(ticket);

    // 2. Usamos html2canvas para tomarle la foto al ticket
    html2canvas(ticket, { scale: 2, backgroundColor: "#ffffff" }).then(canvas => {
        // 3. Creamos el enlace de descarga invisible y le damos clic
        const link = document.createElement('a');
        link.download = 'Pedido_AC_Digital.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // 4. Limpiamos el DOM y avisamos al usuario
        document.body.removeChild(ticket);
        mostrarToast("¡Imagen descargada!");
        cerrarCarrito();
    }).catch(err => {
        console.error("Error generando la imagen", err);
        mostrarToast("Hubo un error al crear la imagen");
        document.body.removeChild(ticket);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarInventario();
});