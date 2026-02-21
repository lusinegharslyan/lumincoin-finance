import {ValidationUtils} from "../../utils/validation-utils";

export class IncomeAndExpensesEdit {
    constructor() {
        this.findElements();
        this.validations = [
            {element: this.typeElement},
            {element: this.categoryElement},
            {element: this.amountElement},
            {element: this.dateElement},
            {element: this.commentElement},
        ];
        this.createButtonElement.addEventListener('click', this.createIncomeOrExpanse.bind(this));
    }

    findElements() {
        this.typeElement = document.getElementById('type');
        this.categoryElement = document.getElementById('category');
        this.amountElement = document.getElementById('amount');
        this.dateElement = document.getElementById('date');
        this.commentElement = document.getElementById('comment');
        this.createButtonElement = document.getElementById('create-button');
    }

    createIncomeOrExpanse() {
        ValidationUtils.validateForm(this.validations);
    }
}