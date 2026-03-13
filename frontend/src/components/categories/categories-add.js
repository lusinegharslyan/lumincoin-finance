import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {CategoryService} from "../../services/category-service";
import config from "../../config/config";

export class CategoriesAdd {
    constructor(type, openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.type = type;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.findElements();
        this.validations = [
            {element: this.categoryTitleElement},
        ];
        this.pageTitleElement.innerText= `Создание категории ${this.type === config.operationTypes.income? 'доходов':'расходов'}`;
        this.cancelAddCategoryElement.href=`${this.type === config.operationTypes.income? '/income':'/expense'}`
        this.createCategoryButtonElement.addEventListener('click', this.createCategory.bind(this));
    }

    findElements() {
        this.pageTitleElement = document.getElementById('page-title');
        this.categoryTitleElement = document.getElementById('category-title');
        this.createCategoryButtonElement = document.getElementById('create-button');
        this.cancelAddCategoryElement = document.getElementById('cancel-add-category');
    }

    async createCategory() {
        if (ValidationUtils.validateForm(this.validations)) {
            const newCategoryData = {
                title: this.categoryTitleElement.value
            };
            const response = await CategoryService.createCategory(this.type, newCategoryData);
            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }
            return this.openNewRoute(`/${this.type}`);
        }
    }
}