import {AuthUtils} from "../../utils/auth-utils";

export class ExpenseCategoriesDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }

    }
}