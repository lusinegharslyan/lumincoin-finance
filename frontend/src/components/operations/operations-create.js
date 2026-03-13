import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {UrlUtils} from "../../utils/url-utils";
import {OperationsService} from "../../services/operations-service";
import {CategoryService} from "../../services/category-service";

export class OperationsCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.type = UrlUtils.getUrlParam('type');
        if (!this.type) {
            return this.openNewRoute('/');
        }
        this.findElements();
        this.validations = [
            {element: this.typeElement},
            {element: this.categoryElement},
            {element: this.amountElement},
            {element: this.dateElement},
            {element: this.commentElement},
        ];
        this.init().then();
        this.createButtonElement.addEventListener('click', this.createOperation.bind(this));
    }

    async init(id) {
        for (let i = 0; i < this.typeElement.options.length; i++) {
            if (this.typeElement.options[i].value === this.type) {
                this.typeElement.selectedIndex = i;
            }
        }
        const result = await CategoryService.getCategories(this.type);
        if (!result.error) {
            const categories = result.categories;
            for (let i = 0; i < categories.length; i++) {
                const option = document.createElement('option');
                option.value = categories[i].id;
                option.innerText = categories[i].title;
                this.categoryElement.appendChild(option);
            }
        }
    }

    findElements() {
        this.typeElement = document.getElementById('type');
        this.categoryElement = document.getElementById('category');
        this.amountElement = document.getElementById('amount');
        this.dateElement = document.getElementById('date');
        this.commentElement = document.getElementById('comment');
        this.createButtonElement = document.getElementById('create-button');
    }

    async createOperation(e) {
        e.preventDefault();
        if (ValidationUtils.validateForm(this.validations)) {
            const newOperationData = {
                type: this.typeElement.value,
                category_id: Number(this.categoryElement.value),
                amount: parseInt(this.amountElement.value),
                date: this.dateElement.value,
                comment: this.commentElement.value
            };
            if (Object.keys(newOperationData).length > 0) {
                const response = await OperationsService.createOperation(newOperationData);
                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }
                return this.openNewRoute('/operations');
            }
        }
    }
}