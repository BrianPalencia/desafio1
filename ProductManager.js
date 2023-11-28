const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.productIdCounter = 1;
        this.initializeFile();
    }

    initializeFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    addProduct(newProduct) {
        const products = this.getProductsFromFile();
        newProduct.id = this.productIdCounter++;
        products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(products));
    }

    getProductsFromFile() {
        const data = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(data);
    }

    getProducts() {
        return this.getProductsFromFile();
    }

    getProductById(id) {
        const products = this.getProductsFromFile();
        const product = products.find(product => product.id === id);
        if (!product) {
            console.error('Producto no encontrado.');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        let products = this.getProductsFromFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            fs.writeFileSync(this.path, JSON.stringify(products));
        } else {
            console.error('Producto no encontrado.');
        }
    }

    deleteProduct(id) {
        let products = this.getProductsFromFile();
        products = products.filter(product => product.id !== id);
        fs.writeFileSync(this.path, JSON.stringify(products));
    }
}

const manager = new ProductManager('productos.json');

manager.addProduct({
    title: 'Producto 1',
    description: 'Descripción del Producto 1',
    price: 20,
    thumbnail: 'imagen1.jpg',
    code: 'ABC123',
    stock: 50
});

manager.addProduct({
    title: 'Producto 2',
    description: 'Descripción del Producto 2',
    price: 30,
    thumbnail: 'imagen2.jpg',
    code: 'DEF456',
    stock: 30
});

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));
// manager.updateProduct(1, { price: 25 }); // aca podemos ver el ejemplo del update
// manager.deleteProduct(1); // y aca esta el ejemplo de borrar o eliminar
