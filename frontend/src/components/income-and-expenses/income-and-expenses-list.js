import {AuthUtils} from "../../utils/auth-utils";

export class IncomeAndExpensesList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.findElements();
        this.deleteIconElement.addEventListener('click', this.openDeleteConfirmationPopup.bind(this));
        this.confirmDeleteButtonElement.addEventListener('click', this.closeDeleteConfirmationPopup.bind(this));
        this.cancelDeleteButtonElement.addEventListener('click', this.closeDeleteConfirmationPopup.bind(this));
    }

    findElements() {
        this.deleteIconElement = document.getElementById('delete-icon');
        this.modalElement = document.getElementById('delete-modal-dialog');
        this.confirmDeleteButtonElement = document.getElementById('confirm-delete');
        this.cancelDeleteButtonElement = document.getElementById('cancel-delete');
    }

    openDeleteConfirmationPopup() {
        this.modalElement.style.display = 'block';
    }

    closeDeleteConfirmationPopup() {
        this.modalElement.style.display = 'none';
    }
}