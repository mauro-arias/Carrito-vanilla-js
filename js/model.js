
export default class Model {
    constructor(){
        this.view = null;
        this.products = JSON.parse(localStorage.getItem('products'));
        if(!this.products || this.products.length < 1){
            this.products = [];
        }
    }

    renderFromStorage(){
        if(this.products.length > 0){
            this.products.forEach( (product) => {
                this.view.table.createRow(product);
            })
            this.view.summary.updateTotal();
            this.view.summary.updateUnit();
            this.view.summary.updateQuantity();
            this.view.summary.renderSummary();
        }
    }

    save(){
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    addToCart(item){
        const alreadyExists = this.checkIfExists(item.id);

        if ( alreadyExists === false){
            this.products.push(item);
            this.save();
            this.view.table.createRow(item);
            this.view.alert.showAlert('Producto añadido', 'bg-green-700', 'check');
        } else {
            // Sumo uno a la cantidad de la vista (tabla) y al modelo
            this.view.table.add(item.id);
            this.save();
            // Muestro mensaje
            this.view.alert.showAlert('Este producto ya se encuentra en tu carrito', 'bg-yellow-700', 'info');
        };
    }

    isEmpty(){
        return this.products.length === 0;
    }

    findProduct(id){
        return this.products.findIndex( (product) => product.id === id);
    }

    removeProduct(id){
        const index = this.findProduct(id);
        this.products.splice(index, 1);
        this.save();
    }

    checkIfExists = (id) => {

        let found = false;
        if(this.products.length === 0){
            return false;
        } else {
            this.products.forEach( (product, index) => {
                if (product.id == id){
                    found = index;
                }
            })

            return found;
        }

    }

}