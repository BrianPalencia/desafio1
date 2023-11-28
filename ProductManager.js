class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }

    addProduct(title, description, price, thumbnail, stock) {
        if (!title || !description || !price || !thumbnail || !stock) {
            console.error('Todos los campos son obligatorios.');
            return;
        }

        const existingProduct = this.products.find(product => product.title === title);
        if (existingProduct) {
            console.error('Ya existe un producto con el mismo título.');
            return;
        }

        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            stock
        };

        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.error('Producto no encontrado.');
        }
        return product;
    }
}


const manager = new ProductManager();

manager.addProduct('Producto 1', 'Descripción del Producto 1', 20, 'imagen1.jpg', 50);
manager.addProduct('Producto 2', 'Descripción del Producto 2', 30, 'imagen2.jpg', 30);

console.log(manager.getProducts()); 

console.log(manager.getProductById(1)); 
console.log(manager.getProductById(3)); 
