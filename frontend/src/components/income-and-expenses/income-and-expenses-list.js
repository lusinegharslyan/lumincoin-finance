export class IncomeAndExpensesList {
    constructor() {
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