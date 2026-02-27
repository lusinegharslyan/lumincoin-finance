import {AuthUtils} from "../../utils/auth-utils";

export class IncomeCategoriesDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }

    }
}