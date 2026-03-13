import {AuthUtils} from "../../utils/auth-utils";
import {CategoryService} from "../../services/category-service";
import {CommonUtils} from "../../utils/common-utils";
import config from "../../config/config";

export class CategoriesList {
    constructor(type, openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.type = type;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.findElements();
        this.getCategories().then();
        this.addCategoryElement.href = `/${this.type}/category/add`;
        this.categoriesTitleElement.innerText = this.type === config.operationTypes.income ? 'Доходы' : 'Расходы';
        this.cancelDeleteButtonElement.addEventListener('click', this.closeDeleteConfirmationPopup.bind(this));

    }

    async getCategories() {
        const response = await CategoryService.getCategories(this.type);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        this.showCategories(response.categories);
    }

    showCategories(categories) {
        const categoriesListElement = document.getElementById('categories-list');
        for (let i = 0; i < categories.length; i++) {
            const categoryBlockElement = CommonUtils.generateCategoryBlock(categories[i]);
            const actionsDeleteButtonElement = categoryBlockElement.querySelector('.category-delete-button');
            const actionsUpdateButtonElement = categoryBlockElement.querySelector('.category-update-button');

            actionsUpdateButtonElement.setAttribute('href', `/${this.type}/category/edit?id=${categories[i].id}`);
            if (actionsDeleteButtonElement) {
                actionsDeleteButtonElement.addEventListener('click', () => {
                    this.openCategoryDeleteConfirmationPopup(categories[i].id);
                });
            }
            categoriesListElement.prepend(categoryBlockElement);
        }
    }

    findElements() {
        this.categoriesTitleElement = document.getElementById('categories-title');
        this.addCategoryElement = document.getElementById('add-category');
        this.modalElement = document.getElementById('delete-modal-dialog');
        this.confirmDeleteButtonElement = document.getElementById('confirm-delete');
        this.cancelDeleteButtonElement = document.getElementById('cancel-delete');
    }

    openCategoryDeleteConfirmationPopup(id) {
        this.confirmDeleteButtonElement.href = `/${this.type}/category/delete?id=${id}`;
        this.modalElement.style.display = 'block';
    }

    closeDeleteConfirmationPopup() {
        this.modalElement.style.display = 'none';
    }
}