import Table from './components/table.js';
import Alert from './components/alert.js';
import Summary from './components/summary.js';

export default class View {
    constructor() {
        this.model = null;
        this.store = document.getElementById('store');
        this.table = new Table();
        this.alert = new Alert();
        this.summary = new Summary();

        this.store.addEventListener('click', e => {
            this.getProduct(e);
        });
    }

    getProduct(e){
        if(e.target.tagName === 'BUTTON'){
            const product = document.getElementById(`${e.target.getAttribute('data-id')}`);
            this.addToCart(product);
        };
        e.stopPropagation();
    }

    getData = async () => {
        const res = await fetch('./js/data.json');
        const data = await res.json();
        return data;
    }

    searchIntPrice = async (id) => {

        const data = await this.getData()
        let intPrice = 0;
        data.forEach( (product) =>  {
            if(product.id == id){
                intPrice = product.price;
            }
        })

        return intPrice;
    }   


    async addToCart(product){

        const item = {
            id: product.getAttribute('id'),
            name: product.querySelector('h2').innerText,
            price: await this.searchIntPrice(product.getAttribute('id')),
            quantity: 1,
        }

        // Añado al modelo el producto
        this.model.addToCart(item);
        // Actualizo el total y la cantidad del resumen
        this.summary.updateTotal();
        this.summary.updateUnit();
        this.summary.updateQuantity();
        this.summary.renderSummary();
    }

    loadData = async () => {
        const res = await fetch('./js/data.json');
        const data = await res.json()
        data.forEach( (product) =>  this.renderStoreProduct(product));
    }

    renderStoreProduct(product){
        let numberFormat = new Intl.NumberFormat('es-ES');
        this.store.innerHTML += `
            <div class="shadow-lg h-58 w-52 rounded-lg" id=${product.id}>
                <img class='h-32 w-full rounded-t-lg' src="${product.image}" alt="${product.name}">

                <div class="px-5 py-2">
                    <h2>${product.name}</h2>
                </div>

                <div class="px-5 py-2 text-purple-900">
                    <p>$${numberFormat.format(product.price)}</p>
                </div>

                <div class='flex justify-center items-center px-5 py-2 w-full' id=btn-container-${product.id}>
                    <!-- <button id='btn-${product.id}' class='bg-gray-900 transition duration-200 hover:bg-gray-700 text-white w-full py-1 rounded-lg shadow-lg'><i class="ai-cart mr-2 text-lg"></i>Agregar</button> -->
                </div>
            </div>
        `;

        const btn = document.createElement('button');
        const btnContainer = document.getElementById(`btn-container-${product.id}`)
        btn.classList.add('bg-gray-900', 'transition', 'duration-200', 'hover:bg-gray-700', 'text-white', 'w-full', 'py-2', 'rounded-lg', 'shadow-lg','text-sm');
        btn.innerHTML = '<i class="ai-cart mr-2"></i>Agregar';
        btn.dataset.id = product.id;
        btnContainer.appendChild(btn);
    }

}