import {HttpUtils} from "../utils/http-utils";

export class BalanceService {
    static async getBalance() {
        const result = await HttpUtils.request('/balance');
        if (result.error || !result.response ) {
            return false;
        }
        return result.response;
    }

    static async updateBalance(newBalance) {
        const result = await HttpUtils.request('/balance','PUT',true,{newBalance: newBalance});
        if (result.error || !result.response ) {
            return false;
        }
        return result.response;
    }
}