import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class IncomeAndExpensesEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
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