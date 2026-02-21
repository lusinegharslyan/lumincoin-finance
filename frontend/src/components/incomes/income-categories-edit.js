import {ValidationUtils} from "../../utils/validation-utils";

export class IncomeCategoriesEdit {
    constructor() {
        this.findElements();
        this.validations = [
            {element: this.salaryElement},
        ];
        this.updateButtonElement.addEventListener('click', this.updateIncomeCategory.bind(this));
    }

    findElements() {
        this.salaryElement = document.getElementById('salary');
        this.updateButtonElement = document.getElementById('update-button');
        this.cancelButtonElement = document.getElementById('cancel-button');

    }

    updateIncomeCategory() {
        ValidationUtils.validateForm(this.validations);
    }
}