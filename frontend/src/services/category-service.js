import {HttpUtils} from "../utils/http-utils";
import config from "../config/config";

export class CategoryService {
    static async getCategories(type) {
        const returnObject = {
            error: false,
            redirect: null,
            categories: null
        }
        const result = await HttpUtils.request('/categories/' + type);

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            returnObject.error = `Возникла ошибка при запросе ${config.operationTypes[type]}ов. Обратитесь в поддержку.`;
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }
        returnObject.categories = result.response;
        return returnObject;
    }

    static async createCategory(type, data) {
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        }
        const result = await HttpUtils.request('/categories/' + type, 'POST', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = `Возникла ошибка при создании ${config.operationTypes[type]}а. Обратитесь в поддержку.`;
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }
        returnObject.id = result.response.id;
        return returnObject;
    }

    static async deleteCategory(type, id) {
        const returnObject = {
            error: false,
            redirect: null,
        }
        const result = await HttpUtils.request('/categories/' + type + '/' + id, 'DELETE', true);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = `Возникла ошибка при удалении категории ${config.operationTypes[type]}а. Обратитесь в поддержку.`;
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }
        return returnObject;
    }

    static async updateCategory(type, id, data) {
        const returnObject = {
            error: false,
            redirect: null,
        }
        const result = await HttpUtils.request('/categories/' + type + '/' + id, 'PUT', true, data);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = `Возникла ошибка при редактирования категории ${config.operationTypes[type]}а. Обратитесь в поддержку.`;
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }
        return returnObject;
    }

    static async getCategory(type, id) {
        const returnObject = {
            error: false,
            redirect: null,
            category: null
        }
        const result = await HttpUtils.request('/categories/' + type + '/' + id);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = `Возникла ошибка при запросе ${config.operationTypes[type]}а. Обратитесь в поддержку.`;
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }
        returnObject.category = result.response;
        return returnObject;
    }
}