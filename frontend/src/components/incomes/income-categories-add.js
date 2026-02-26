import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class IncomeCategoriesAdd {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
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