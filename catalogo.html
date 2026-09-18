<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Catálogo Comercial | AC Digital</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <style>
        /* =====================================================
           BASE RESPONSIVA (evita que algo "empuje" el ancho
           de la página y el celular tenga que hacer zoom out)
           ===================================================== */
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        html, body { max-width: 100%; overflow-x: hidden; }
        img, svg, video { max-width: 100%; height: auto; }
        .container { max-width: 100%; }
        .catalog-container { width: 100%; max-width: 100%; min-width: 0; }

        /* === ANIMACIONES Y UX === */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
        @keyframes modalFadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(3px); } }
        @keyframes slideUpCart { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }

        /* === BUSCADOR === */
        .search-wrapper {
            position: relative; width: 100%; max-width: 700px;
            margin: -25px auto 25px auto; background: white; border-radius: 50px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05); z-index: 10;
        }
        .search-wrapper .search-icon {
            position: absolute; left: 22px; top: 50%; transform: translateY(-50%);
            color: #64748b; font-size: 1.2rem; margin: 0; padding: 0; pointer-events: none;
        }
        .search-wrapper input {
            width: 100%; border: none; outline: none; padding: 18px 20px 18px 55px;
            font-size: 1rem; background: transparent; border-radius: 50px;
            font-family: inherit; text-overflow: ellipsis;
        }

        /* === FILTROS === */
        .filter-section {
            display: flex; justify-content: space-between; align-items: center;
            flex-wrap: wrap; gap: 15px; margin-bottom: 25px;
        }
        .filter-buttons { display: flex; flex-wrap: wrap; gap: 8px; min-width: 0; }
        .filter-buttons .btn-filter {
            white-space: nowrap; display: inline-flex; align-items: center;
            justify-content: center; gap: 6px;
        }
        .btn-download {
            background: #e3342f; color: white; padding: 10px 20px; border-radius: 8px;
            text-decoration: none; font-weight: 600; display: inline-flex;
            align-items: center; justify-content: center; gap: 8px; transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(227, 52, 47, 0.2);
        }

        /* === GRID DE PRODUCTOS === */
        .grid-cards {
            display: grid;
            /* min(100%, 240px) evita desbordes en pantallas muy angostas */
            grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
            gap: 24px;
        }

        /* === TARJETAS === */
        .card {
            background: white; padding: 20px; border-radius: 12px; min-width: 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease; opacity: 0;
            animation: fadeInUp 0.5s ease forwards;
        }
        .card:hover { transform: translateY(-5px); box-shadow: 0 12px 20px rgba(0,0,0,0.1); }
        .card-badge-wrap { margin-bottom: 15px; }
        .card-title {
            margin: 0 0 15px 0; font-size: 1.15rem; color: #0f172a;
            flex-grow: 1; line-height: 1.3; overflow-wrap: anywhere;
        }
        .badge-med, .badge-misc {
            display: inline-block; max-width: 100%; padding: 6px 10px; border-radius: 6px;
            font-size: 0.75rem; font-weight: 600; line-height: 1.3;
            white-space: normal; overflow-wrap: anywhere;
        }
        .badge-med { background: #eff6ff; color: #2563eb; }
        .badge-misc { background: #fef3c7; color: #d97706; }
        .btn-add-cart {
            background: #2563eb; color: white; border: none; padding: 12px; width: 100%;
            border-radius: 8px; cursor: pointer; font-weight: 600; margin-top: 15px;
            transition: all 0.2s; font-family: inherit; font-size: 1rem;
        }
        .btn-add-cart:hover { background: #1d4ed8; transform: scale(1.02); }
        .btn-add-cart:active { transform: scale(0.98); }

        /* === PAGINACIÓN === */
        .pagination {
            display: flex; justify-content: center; align-items: center; flex-wrap: wrap;
            gap: 8px; margin-top: 40px; margin-bottom: 20px;
        }
        .page-btn {
            background: white; border: 1px solid #cbd5e1; color: #475569; width: 40px; height: 40px;
            border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer;
            transition: all 0.2s; display: flex; justify-content: center; align-items: center;
        }
        .page-btn:hover:not(:disabled) { background: #f1f5f9; color: #0f172a; }
        .page-btn.active { background: #2563eb; color: white; border-color: #2563eb; }
        .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* === CARRITO FLOTANTE Y MODAL === */
        .cart-floating {
            position: fixed; bottom: calc(30px + env(safe-area-inset-bottom, 0px)); right: 30px;
            background: #10b981; color: white; width: 60px; height: 60px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
            cursor: pointer; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); z-index: 1000;
            transition: transform 0.2s, background 0.2s;
        }
        .cart-floating:hover { transform: translateY(-5px) scale(1.05); background: #059669; }
        .cart-count {
            position: absolute; top: -5px; right: -5px; background: #ef4444; color: white;
            font-size: 0.8rem; font-weight: bold; width: 24px; height: 24px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .cart-modal {
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.6); z-index: 1001; justify-content: center; align-items: center;
        }
        .cart-content {
            background: white; width: 90%; max-width: 450px; border-radius: 16px; padding: 30px;
            max-height: 85vh; max-height: 85dvh; overflow-y: auto; position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            -webkit-overflow-scrolling: touch; overscroll-behavior: contain;
        }
        .cart-content h2 { margin: 0 0 20px; color: #0f172a; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; padding-right: 30px; }
        .close-modal {
            position: absolute; top: 20px; right: 20px; font-size: 1.5rem; cursor: pointer;
            color: #94a3b8; transition: color 0.2s, transform 0.2s; padding: 4px;
        }
        .close-modal:hover { color: #ef4444; transform: rotate(90deg); }
        .cart-item { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 15px 0; border-bottom: 1px solid #f1f5f9; }
        .cart-item-name { flex: 1 1 auto; min-width: 0; color: #334155; font-size: 0.95rem; overflow-wrap: anywhere; }
        .cart-hint { text-align: center; font-size: 0.8rem; color: #64748b; margin-top: 10px; }

        /* Botón de Descargar Imagen */
        .btn-download-img {
            background: #0f172a; color: white; border: none; padding: 15px; width: 100%;
            border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 1.1rem; margin-top: 20px;
            display: flex; justify-content: center; align-items: center; gap: 10px;
            transition: all 0.2s; font-family: inherit;
        }
        .btn-download-img:hover { background: #1e293b; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2); }

        .qty-controls { display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 4px; border-radius: 8px; flex-shrink: 0; }
        .qty-btn { background: white; border: 1px solid #e2e8f0; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; font-weight: bold; color: #475569; transition: all 0.2s; }
        .qty-btn:hover { background: #e2e8f0; color: #0f172a; }
        .qty-value { min-width: 20px; text-align: center; font-weight: 600; color: #0f172a; font-size: 0.9rem; }

        #toast-container {
            position: fixed; bottom: calc(30px + env(safe-area-inset-bottom, 0px)); left: 50%;
            transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column;
            align-items: center; gap: 10px; pointer-events: none; width: max-content; max-width: 90vw;
        }
        .toast {
            background: #1e293b; color: white; padding: 12px 24px; border-radius: 50px;
            font-size: 0.95rem; font-weight: 500; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            display: flex; align-items: center; gap: 8px; animation: fadeInUp 0.3s ease forwards;
            max-width: 100%; overflow-wrap: anywhere;
        }

        /* === FOOTER === */
        .footer-bottom { text-align: center; padding: 20px; color: #64748b; }
        .footer-col li, .footer-col p { overflow-wrap: anywhere; }

        /* =====================================================
           TABLET / CELULAR
           ===================================================== */
        @media (max-width: 768px) {
            .catalog-hero h1 { font-size: clamp(1.6rem, 7vw, 2.4rem); line-height: 1.2; }
            .catalog-hero .subtitle { font-size: clamp(0.95rem, 3.8vw, 1.1rem); }
            .footer-grid { grid-template-columns: 1fr !important; gap: 24px; text-align: center; }
            .nav-links { flex-wrap: wrap; justify-content: center; }
        }

        @media (max-width: 600px) {
            .search-wrapper { margin: -22px auto 20px auto; }
            .search-wrapper input { font-size: 16px; /* evita el zoom automático de iOS */ padding: 16px 16px 16px 50px; }
            .search-wrapper .search-icon { left: 18px; font-size: 1.05rem; }

            .filter-section { flex-direction: column; align-items: stretch; gap: 12px; }
            .filter-buttons { width: 100%; }
            .filter-buttons .btn-filter {
                flex: 1 1 0; padding: 10px 8px; font-size: 0.85rem; min-width: 0;
            }
            .btn-download { width: 100%; }

            .grid-cards { gap: 16px; }
            .card { padding: 16px; }
            .card-title { font-size: 1.05rem; }

            .pagination { gap: 6px; margin-top: 30px; }
            .page-btn { width: 36px; height: 36px; font-size: 0.9rem; }

            .cart-floating { width: 56px; height: 56px; right: 18px; bottom: calc(18px + env(safe-area-inset-bottom, 0px)); font-size: 1.35rem; }
            .cart-content { width: 94%; padding: 22px 18px; }
            .cart-content h2 { font-size: 1.3rem; }
            .close-modal { top: 16px; right: 16px; }
            #toast-container { bottom: calc(90px + env(safe-area-inset-bottom, 0px)); }
            .toast { padding: 10px 18px; font-size: 0.9rem; border-radius: 24px; }
        }

        @media (max-width: 360px) {
            .filter-buttons .btn-filter { font-size: 0.78rem; padding: 9px 4px; gap: 4px; }
            .page-btn { width: 32px; height: 32px; }
        }

        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .card { animation: none; opacity: 1; }
        }
    </style>
</head>
<body class="bg-light">
    <!-- Navbar -->
    <nav class="navbar">
        <div class="container nav-content">
            <div class="logo">
                <i class="fa-solid fa-layer-group"></i> AC Digital
            </div>
            <ul class="nav-links">
                <li><a href="index.html"><i class="fa-solid fa-house"></i> Inicio</a></li>
                <li><a href="catalogo.html" class="active"><i class="fa-solid fa-box-open"></i> Catálogo</a></li>
            </ul>
        </div>
    </nav>

    <header class="catalog-hero">
        <div class="container text-center">
            <h1><i class="fa-solid fa-store"></i> Catálogo en Línea</h1>
            <p class="subtitle">Selecciona tus productos y genera tu pedido</p>
        </div>
    </header>

    <main class="container catalog-container" id="inicio-catalogo">
        <!-- Búsqueda -->
        <div class="search-wrapper">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="search" id="searchBar" placeholder="Buscar paracetamol, jeringas, rastrillos..." oninput="aplicarFiltros(true)" autocomplete="off" enterkeyhint="search">
        </div>

        <!-- Filtros y Botón PDF -->
        <div class="filter-section">
            <div class="filter-buttons">
                <button onclick="cambiarCategoria('todos', this)" class="btn-filter active-filter"><i class="fa-solid fa-list"></i> Todos</button>
                <button onclick="cambiarCategoria('medicamento', this)" class="btn-filter"><i class="fa-solid fa-tablets"></i> Farmacia</button>
                <button onclick="cambiarCategoria('miscelaneo', this)" class="btn-filter"><i class="fa-solid fa-box"></i> Miscelánea</button>
            </div>
            <a href="catalogo.pdf" download="Catalogo_AC_Digital.pdf" class="btn-download">
                <i class="fa-solid fa-file-pdf"></i> Catálogo PDF
            </a>
        </div>

        <!-- Grid de Productos -->
        <div id="product-grid" class="grid-cards"></div>

        <!-- Paginación -->
        <div id="pagination-controls" class="pagination"></div>
    </main>

    <!-- Botones y Modales del Carrito -->
    <div class="cart-floating" onclick="abrirCarrito()" role="button" aria-label="Abrir carrito">
        <i class="fa-solid fa-cart-shopping"></i>
        <div class="cart-count" id="cartCount">0</div>
    </div>

    <div class="cart-modal" id="cartModal">
        <div class="cart-content" id="cartContent">
            <i class="fa-solid fa-xmark close-modal" onclick="cerrarCarrito()" role="button" aria-label="Cerrar carrito"></i>
            <h2>Tu Pedido</h2>
            <div id="cartItemsContainer"></div>

            <!-- Botón para generar imagen -->
            <button class="btn-download-img" onclick="descargarPedidoImagen()">
                <i class="fa-solid fa-image" style="font-size: 1.3rem;"></i> Descargar Ticket (Imagen)
            </button>
            <p class="cart-hint">
                Descarga esta imagen y envíanosla por WhatsApp para procesar tu pedido.
            </p>
        </div>
    </div>
    <div id="toast-container"></div>

    <footer class="footer-professional mt-auto">
        <div class="container footer-grid">
            <div class="footer-col">
                <h3><i class="fa-solid fa-layer-group"></i> AC Digital</h3>
                <p>Proveedor de confianza en soluciones digitales e insumos comerciales.</p>
            </div>
            <div class="footer-col">
                <h3>Contacto Rápido</h3>
                <ul>
                    <li><i class="fa-solid fa-phone"></i> 986 102 9065</li>
                    <li><i class="fa-solid fa-envelope"></i> angelcaamal0829@gmail.com</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Angel Adrian Caamal Dzul.</p>
        </div>
    </footer>

    <!-- LIBRERÍA HTML2CANVAS PARA TOMAR FOTOS AL DOM -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
