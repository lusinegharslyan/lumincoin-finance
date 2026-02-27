import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class ExpenseCategoriesEdit {
    constructor (openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
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