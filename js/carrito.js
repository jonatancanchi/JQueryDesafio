class Carrito {

    //Añadir producto al carrito
    comprarProducto(e){
    e.preventDefault();

    //Para agregar al carrito
    if(e.target.classList.contains('agregar-carrito')){
    const producto = e.target.parentElement.parentElement;

    //Enviar y tomar datos
    this.leerDatosProducto(producto);
     }
    }

    //Leer datos del producto
    leerDatosProducto(producto){
        const infoProducto = {
        imagen : producto.querySelector('img').src,
        titulo: producto.querySelector('li').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        }

        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
        if(productoLS.id === infoProducto.id){
        productosLS = productoLS.id;
         }
        });

        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1000
            })
        }
        else {
        this.insertarCarrito(infoProducto);
        }        
    }

    //mostrar producto en carrito
    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td> <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a></td>`;

        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    //Eliminar producto del carrito
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();

    }

    //Vaciar carrito
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    //Almacenar en el LS
    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Comprobar que hay elementos en el LS
    obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }

    //Mostrar los productos guardados en el LS
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            
            
            const row = document.createElement('tr');
            row.innerHTML =
               `<td><img src="${producto.imagen}" width=100></td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>`;

            listaProductos.appendChild(row);
        });
    }

   
    //Eliminar producto por ID del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        
        productosLS = this.obtenerProductosLocalStorage();

        //Compara el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

    localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Eliminar los datos del LS
    vaciarLocalStorage(){
        localStorage.clear();
    }

    
    obtenerEvento(e) { e.preventDefault();
        let id, cantidad, producto, productosLS;

        if (e.target.classList.contains('cantidad')) {

            localStorage.setItem('productos', JSON.stringify(productosLS));               
    }
       else {
            console.log("click afuera");
        }
   }

   }


