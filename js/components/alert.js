export default class Alert {
    constructor() {
        this.alert = document.getElementById('alert');
    }

    showAlert(message, color, icon){

        if(icon === 'info'){
            var iconElement = `<i class="ai-info-fill mr-2"></i>`;
        } else if(icon === 'check'){
            var iconElement = `<i class="ai-circle-check-fill mr-2"></i>`;
        }

        this.alert.innerText = message;
        this.alert.classList.add(color);
        this.alert.innerHTML = `<p class="text-sm text-slate-200 ">${iconElement} ${message}</p>`;

        this.alert.classList.remove('hidden');
        setTimeout( () => {
            this.alert.classList.add('hidden');
        }, 3000)

    }
}