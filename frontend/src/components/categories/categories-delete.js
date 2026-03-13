import {AuthUtils} from "../../utils/auth-utils";
import {UrlUtils} from "../../utils/url-utils";
import {CategoryService} from "../../services/category-service";

export class CategoriesDelete {
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
        this.deleteCategory(id).then();
    }

    async deleteCategory(id) {
        const response = await CategoryService.deleteCategory(this.type, id);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return this.openNewRoute(`/${this.type}`);
    }
}