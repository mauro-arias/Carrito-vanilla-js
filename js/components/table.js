import Alert from './alert.js';

export default class Table {
    constructor(){
        this.model = null;
        this.alert = new Alert();
        this.table = document.getElementById('table');
        this.message = document.getElementById('message');
        this.tableHead = document.getElementById('table-head');
        this.summaryContainer = document.getElementById('summary');
        this.summary = null;
    }

    add(id){
        // Sumo uno al modelo
        const index = this.model.findProduct(id);
        this.model.products[index].quantity += 1;
        // Sumo uno a la tabla a la vista
        const row = document.querySelector(`[key="${id}"]`);
        const result = parseInt(row.children[2].children[1].innerText) + 1;
        row.children[2].children[1].innerText = result;
        // Actualizo el total
        this.summary.updateQuantity();
        this.summary.updateUnit();
        this.summary.updateTotal();
        this.summary.renderSummary();

        this.model.save();
    }

    decrease(id){
        const index = this.model.findProduct(id);
        // Resto uno al modelo si la cantidad es mayor a uno
        if(this.model.products[index].quantity > 1){
            this.model.products[index].quantity -= 1;
            // Resto uno a la tabla a la vista
            const row = document.querySelector(`[key="${id}"]`);
            const result = parseInt(row.children[2].children[1].innerText) - 1;
            row.children[2].children[1].innerText = result;
            // Actualizo el total
            this.summary.updateTotal();
            this.summary.updateUnit();
            this.summary.updateQuantity();
            this.summary.renderSummary();

            this.model.save();
        }

    }

    removeProduct(id){

        // Eliminar del modelo
        this.model.removeProduct(id);
        if(this.model.isEmpty()){
            this.tableHead.classList.add('hidden');
            this.summaryContainer.classList.add('hidden');
            this.message.classList.remove('hidden');
        }
        // eliminar de la vista
        document.querySelector(`[key="${id}"]`).remove();
        this.alert.showAlert('Producto eliminado del carrito', 'bg-red-600', 'info');

        // Volver a calcular el total ya la cantidad de productos
        this.summary.updateTotal();
        this.summary.updateUnit();
        this.summary.updateQuantity();
        this.summary.renderSummary();
    }


    createRow = (item) => {
        this.message.classList.add('hidden');
        this.tableHead.classList.remove('hidden');
        this.summaryContainer.classList.remove('hidden');
        let numberFormat = new Intl.NumberFormat('es-ES');
        const index = this.model.findProduct(item.id);

        const row = this.table.insertRow();
        row.classList.add('flex','shadow-lg','justify-between', 'items-center', 'h-58', 'rounded-lg', 'w-full', 'px-3', 'py-5', 'bg-white', 'mt-2');
        row.setAttribute('key', `${item.id}`)
        row.innerHTML += `
            <!-- Número de producto (indice)-->
            <td class='w-5 flex justify-center'>
                <p class='inline'>${index + 1}</p>
            </td>

            <!-- Nombre del producto-->
            <td class='w-36 flex justify-center'>${item.name}</td>

            <!-- Cantidad del carrito con botones añadir y restar-->
            <td class='flex items-center justify-evenly'>
            </td>

            <!-- Precio del producto-->
            <td class='flex justify-center w-24'>$${numberFormat.format(item.price)}</td>

            <!-- Botón eliminar producto-->
            <td>
            </td>
        `;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('bg-red-600', 'transition', 'duration-200', 'hover:bg-gray-700', 'p-2', 'text-white', 'rounded', 'shadow-lg');
        deleteBtn.innerHTML = '<i class="ai-trash-can"></i>';
        row.children[4].appendChild(deleteBtn);
        deleteBtn.onclick = () => this.removeProduct(item.id);

        const addBtn = document.createElement('button');
        addBtn.classList.add('bg-green-600', 'p-1', 'text-white', 'rounded', 'shadow-lg', 'w-8');
        addBtn.innerHTML = '<i class="ai-plus text-sm"></i>';
        row.children[2].appendChild(addBtn);
        addBtn.onclick = () => this.add(item.id); 
        
        const quantity = document.createElement('p');
        quantity.classList.add('text-lg', 'mx-2');
        quantity.innerHTML = `${item.quantity}`;
        row.children[2].appendChild(quantity);
        

        const decreaseBtn = document.createElement('button');
        decreaseBtn.classList.add('bg-purple-900', 'p-1', 'text-white', 'rounded', 'shadow-lg', 'w-8');
        decreaseBtn.innerHTML = '<i class="ai-minus text-sm"></i>';
        row.children[2].appendChild(decreaseBtn);
        decreaseBtn.onclick = () => this.decrease(item.id); 

    }

}
