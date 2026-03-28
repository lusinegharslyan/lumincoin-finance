import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {UrlUtils} from "../../utils/url-utils";
import {OperationsService} from "../../services/operations-service";
import {CategoryService} from "../../services/category-service";

export class OperationsEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
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
        this.init(id).then();
        this.updateButtonElement.addEventListener('click', this.updateOperation.bind(this));
    }

    async init(id) {
        const operationToEdit = await this.getOperation(id);
        if (operationToEdit) {
            await this.showOperation(operationToEdit);
        }
    }

    findElements() {
        this.typeElement = document.getElementById('type');
        this.categoryElement = document.getElementById('category');
        this.amountElement = document.getElementById('amount');
        this.dateElement = document.getElementById('date');
        this.commentElement = document.getElementById('comment');
        this.updateButtonElement = document.getElementById('update-button');
    }

    async getOperation(id) {
        const response = await OperationsService.getOperation(id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.operationOriginalData = response.operation;
        return response.operation;
    }

    async showOperation(operation) {
        for (let i = 0; i < this.typeElement.options.length; i++) {
            if (this.typeElement.options[i].value === operation.type) {
                this.typeElement.selectedIndex = i;
            }
        }
        const result = await CategoryService.getCategories(operation.type);
        if (!result.error) {
            const categories = result.categories;
            for (let i = 0; i < categories.length; i++) {
                const option = document.createElement('option');
                option.value = categories[i].id;
                option.innerText = categories[i].title;
                if (this.operationOriginalData.category === categories[i].title) {
                    option.selected = true;
                }
                this.categoryElement.appendChild(option);
            }
        }
        this.amountElement.value = operation.amount;
        this.dateElement.value = operation.date;
        this.commentElement.value = operation.comment;
    }

    async updateOperation(e) {
        e.preventDefault();
        if (ValidationUtils.validateForm(this.validations)) {
            const changedData = {
                type: this.typeElement.value,
                category_id: Number(this.categoryElement.value),
                amount: parseInt(this.amountElement.value),
                date: this.dateElement.value,
                comment: this.commentElement.value
            };
            if (Object.keys(changedData).length > 0) {
                const response = await OperationsService.updateOperation(this.operationOriginalData.id, changedData);
                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }
                return this.openNewRoute('/operations');
            }
        }
    }
}