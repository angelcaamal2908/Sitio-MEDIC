let productos = []; 
let categoriaActual = 'todos';
let carrito = [];

// Variables de Paginación
let paginaActual = 1;
const productosPorPagina = 12; // Aumenté a 12 para que sea más cómodo navegar con tantos productos

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
                <h3 style="color: #ef4444;">Cargando catálogo...</h3>
                <p>Si este mensaje no desaparece, asegúrate de haber subido el archivo inventario_export.json a GitHub.</p>
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
        
        const nombreLimpio = prod.nombre.replace(/'/g, "\\'").replace(/"/g, '\\"');

        card.innerHTML = `
            <div style="margin-bottom: 15px;">${badgeHTML}</div>
            <h3 style="margin: 0 0 10px 0; font-size: 1.15rem; color: #0f172a;">${prod.nombre}</h3>
            <p style="color: #64748b; font-size: 0.9rem; flex-grow: 1;"><i class="fa-solid fa-building" style="color: #cbd5e1; margin-right: 5px;"></i> ${prod.marca}</p>
            <button class="btn-add-cart" onclick="agregarAlCarrito(${prod.id}, '${nombreLimpio}')"><i class="fa-solid fa-cart-plus"></i> Añadir</button>
        `;
        grid.appendChild(card);
    });

    renderizarPaginacion(productosFiltrados.length);
}

// --- PAGINACIÓN INTELIGENTE ---
function renderizarPaginacion(totalProductos) {
    const container = document.getElementById('pagination-controls');
    container.innerHTML = '';
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
    if (totalPaginas <= 1) return; 

    // Botón Anterior
    const btnPrev = document.createElement('button');
    btnPrev.className = 'page-btn';
    btnPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    btnPrev.disabled = paginaActual === 1;
    btnPrev.onclick = () => { paginaActual--; aplicarFiltros(); document.getElementById('inicio-catalogo').scrollIntoView(); };
    container.appendChild(btnPrev);

    // Lógica para mostrar solo algunas páginas (Smart Pagination)
    let inicioPagina = Math.max(1, paginaActual - 2);
    let finPagina = Math.min(totalPaginas, paginaActual + 2);

    if (paginaActual <= 3) { finPagina = Math.min(5, totalPaginas); }
    if (paginaActual >= totalPaginas - 2) { inicioPagina = Math.max(1, totalPaginas - 4); }

    // Primera página y puntos suspensivos
    if (inicioPagina > 1) {
        crearBotonPagina(1, container);
        if (inicioPagina > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.innerText = '...';
            ellipsis.style.color = '#94a3b8';
            container.appendChild(ellipsis);
        }
    }

    // Páginas intermedias
    for (let i = inicioPagina; i <= finPagina; i++) {
        crearBotonPagina(i, container);
    }

    // Última página y puntos suspensivos
    if (finPagina < totalPaginas) {
        if (finPagina < totalPaginas - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.innerText = '...';
            ellipsis.style.color = '#94a3b8';
            container.appendChild(ellipsis);
        }
        crearBotonPagina(totalPaginas, container);
    }

    // Botón Siguiente
    const btnNext = document.createElement('button');
    btnNext.className = 'page-btn';
    btnNext.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    btnNext.disabled = paginaActual === totalPaginas;
    btnNext.onclick = () => { paginaActual++; aplicarFiltros(); document.getElementById('inicio-catalogo').scrollIntoView(); };
    container.appendChild(btnNext);
}

function crearBotonPagina(num, container) {
    const btn = document.createElement('button');
    btn.className = `page-btn ${paginaActual === num ? 'active' : ''}`;
    btn.innerText = num;
    btn.onclick = () => { paginaActual = num; aplicarFiltros(); document.getElementById('inicio-catalogo').scrollIntoView(); };
    container.appendChild(btn);
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

// --- 4. TICKET EN IMAGEN REDISEÑADO ---
function descargarPedidoImagen() {
    if (carrito.length === 0) { mostrarToast("Agrega productos primero"); return; }
    
    mostrarToast("Generando ticket...");

    const ticket = document.createElement('div');
    ticket.style.width = '400px';
    ticket.style.padding = '40px 30px';
    ticket.style.background = '#ffffff';
    ticket.style.color = '#0f172a';
    ticket.style.fontFamily = 'Inter, sans-serif';
    ticket.style.position = 'fixed'; 
    ticket.style.top = '0';
    ticket.style.left = '0';
    ticket.style.zIndex = '-1000'; 
    
    const fecha = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const hora = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute:'2-digit' });

    // Encabezados de la tabla del ticket
    let itemsHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 15px; font-weight: bold; color: #64748b; font-size: 0.85rem; letter-spacing: 1px;">
            <span style="width: 60px; text-align: center;">CANT.</span>
            <span style="flex-grow: 1; text-align: left; padding-left: 15px;">DESCRIPCIÓN DEL PRODUCTO</span>
        </div>
    `;

    carrito.forEach(item => {
        itemsHTML += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 10px; align-items: center;">
            <span style="font-weight: 900; color: #0f172a; background: #f1f5f9; padding: 4px 10px; border-radius: 6px; width: 40px; text-align: center;">${item.cantidad}</span>
            <span style="flex-grow: 1; font-size: 0.95rem; font-weight: 500; padding-left: 15px; color: #1e293b; line-height: 1.3;">${item.nombre}</span>
        </div>`;
    });

    ticket.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; color: #2563eb; font-size: 2.2rem; font-weight: 800; letter-spacing: -1px;">AC Digital</h1>
            <h2 style="margin: 5px 0 0 0; font-size: 1.1rem; color: #475569; text-transform: uppercase; letter-spacing: 2px;">Ticket de Pedido</h2>
            <p style="margin: 10px 0 0 0; font-size: 0.85rem; color: #94a3b8;"><i class="fa-regular fa-calendar"></i> ${fecha} &nbsp;|&nbsp; <i class="fa-regular fa-clock"></i> ${hora}</p>
        </div>
        
        <div style="margin-bottom: 30px; background: #f8fafc; padding: 15px; border-radius: 8px;">
            ${itemsHTML}
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding-top: 25px; border-top: 2px solid #cbd5e1;">
            <p style="margin: 0; font-size: 0.95rem; color: #475569; font-weight: 500;">Por favor, envía esta imagen por WhatsApp al:</p>
            <p style="margin: 8px 0 0 0; font-weight: 900; color: #10b981; font-size: 1.6rem; letter-spacing: 1px;">
                <i class="fa-brands fa-whatsapp"></i> 986 102 9065
            </p>
            <p style="margin: 15px 0 0 0; font-size: 0.8rem; color: #94a3b8;">¡Gracias por tu preferencia!</p>
        </div>
    `;

    document.body.appendChild(ticket);

    html2canvas(ticket, { scale: 2, backgroundColor: "#ffffff" }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Ticket_AC_Digital.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        document.body.removeChild(ticket);
        mostrarToast("¡Ticket descargado con éxito!");
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