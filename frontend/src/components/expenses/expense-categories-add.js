import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class ExpenseCategoriesAdd {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.findElements();
        this.validations = [
            {element: this.nameElement},
        ];
        this.createButtonElement.addEventListener('click', this.createExpanseCategory.bind(this));
    }

    findElements() {
        this.nameElement = document.getElementById('name');
        this.createButtonElement = document.getElementById('create-button');
        this.cancelButtonElement = document.getElementById('cancel-button');

    }

    createExpanseCategory() {
        ValidationUtils.validateForm(this.validations);
    }
}