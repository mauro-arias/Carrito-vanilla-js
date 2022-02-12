export default class Summary{
    constructor(){
        this.model = null;
        this.quantity = 0;
        this.unit = 0;
        this.total = 0.0;
        this.summary = document.getElementById('summary');
    }

    renderSummary(){

        const numberFormat = new Intl.NumberFormat('es-ES');
        const summary = `
        <p class='font-medium text-purple-900 mt-3'><i class="ai-ticket mr-1"></i>Resumen</p>
    
        <div class='flex flex-col rounded-lg gap-y-2 shadow-lg bg-white p-3 mt-2 w-full'>
            <p class='text-sm'>Productos añadidos: ${this.unit}</p>
            <p class='text-sm'>Cantidad total: ${this.quantity}</p>
            <p class='text-lg font-semibold'>Total: <span class='text-sm'>$</span>${numberFormat.format(this.total)}</p>
            <button class='bg-green-700 w-full transition duration-200 hover:bg-gray-700 text-white py-2 rounded-lg shadow-lg'><i class="ai-credit-card mr-2 text-lg"></i>Pagar</button>
        </div>
        `
        this.summary.innerHTML = summary;
    }

    updateUnit(){
        this.unit = this.model.products.length;
    }

    updateQuantity(){
        this.quantity = 0;
        this.model.products.forEach( (product) => {
            this.quantity += product.quantity;
        })
        // this.quantity = this.model.products.length;
    }

    updateTotal(){
        this.total = 0;
        this.model.products.forEach( (product) => {
            this.total += product.price * product.quantity;
        })
    }
}