export class IncomeCategories {
    constructor() {
        this.findElements();
        this.categoryDeleteElement.addEventListener('click', this.openCategoryDeletePopup.bind(this));
        this.cancelDeleteButtonElement.addEventListener('click', this.closeDeleteConfirmationPopup.bind(this));
        this.confirmDeleteButtonElement.addEventListener('click', this.closeDeleteConfirmationPopup.bind(this));
    }

    findElements() {
        this.categoryDeleteElement = document.getElementById('category-delete');
        this.modalElement = document.getElementById('delete-modal-dialog');
        this.confirmDeleteButtonElement = document.getElementById('confirm-delete');
        this.cancelDeleteButtonElement = document.getElementById('cancel-delete');
    }

    openCategoryDeletePopup() {
        this.modalElement.style.display = 'block';
    }

    closeDeleteConfirmationPopup() {
        this.modalElement.style.display = 'none';
    }
}