import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {UrlUtils} from "../../utils/url-utils";
import {CategoryService} from "../../services/category-service";
import config from "../../config/config";

export class CategoriesEdit {
    constructor(type, openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.type = type;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }
        this.findElements();
        this.validations = [
            {element: this.categoryTitleElement}
        ];
        this.pageTitleElement.innerText= `Редактирование категории ${this.type === config.operationTypes.income? 'доходов':'расходов'}`;
        this.cancelUpdateCategoryElement.href=`${this.type === config.operationTypes.income? '/income':'/expense'}`
        this.updateButtonElement.addEventListener('click', this.updateCategory.bind(this));
        this.showCategory(id).then();
    }

    async showCategory(id) {
        const response = await CategoryService.getCategory(this.type, id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.categoryOriginalData = response.category;
        this.categoryTitleElement.value = response.category.title;
    }

    findElements() {
        this.pageTitleElement = document.getElementById('page-title');
        this.updateButtonElement = document.getElementById('update-button');
        this.categoryTitleElement = document.getElementById('category-title');
        this.cancelUpdateCategoryElement = document.getElementById('cancel-update-category');
    }

    async updateCategory() {
        if (ValidationUtils.validateForm(this.validations)) {
            const changedData = {};
            if (this.categoryTitleElement.value !== this.categoryOriginalData.title) {
                changedData.title = this.categoryTitleElement.value;
            }

            if (Object.keys(changedData).length > 0) {
                const response = await CategoryService.updateCategory(this.type, this.categoryOriginalData.id, changedData);
                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }
            }
            return this.openNewRoute(`/${this.type}`);
        }
    }
}