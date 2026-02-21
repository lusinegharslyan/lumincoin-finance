import {ValidationUtils} from "../../utils/validation-utils";

export class IncomeCategoriesAdd {
    constructor() {
        this.findElements();
        this.validations = [
            {element: this.nameElement},
        ];
        this.createButtonElement.addEventListener('click', this.createIncomeCategory.bind(this));
    }

    findElements() {
        this.nameElement = document.getElementById('name');
        this.createButtonElement = document.getElementById('create-button');
    }

    createIncomeCategory() {
        ValidationUtils.validateForm(this.validations);
    }
}