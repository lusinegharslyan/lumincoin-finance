import {ValidationUtils} from "../../utils/validation-utils";

export class ExpenseCategoriesEdit {
    constructor () {
        this.findElements();
        this.validations = [
            {element: this.nameElement},
        ];
        this.updateButtonElement.addEventListener('click', this.updateExpanseCategory.bind(this));
    }

    findElements() {
        this.nameElement = document.getElementById('name');
        this.updateButtonElement = document.getElementById('update-button');
    }
    updateExpanseCategory(){
        ValidationUtils.validateForm(this.validations);
    }
}