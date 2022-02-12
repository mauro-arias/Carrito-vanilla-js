import Model from './model.js'
import View from './view.js';
import Summary from './components/summary.js';


document.addEventListener('DOMContentLoaded', () => {
    const view = new View();
    const model = new Model();
    view.model = model;
    model.view = view;
    view.table.model = view.model;
    view.summary.model = view.model;
    view.table.summary = view.summary;
    
    view.loadData();
    model.renderFromStorage();
    view.summary.renderSummary();
})