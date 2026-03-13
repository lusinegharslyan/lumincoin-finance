import {AuthUtils} from "../../utils/auth-utils";
import {OperationsService} from "../../services/operations-service";
import {CommonUtils} from "../../utils/common-utils";

export class OperationsList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.getOperations().then();
        this.findElements();
        this.initIntervalToolbar().then();
    }

    async initIntervalToolbar() {
        const intervalsBlock = CommonUtils.generateIntervalsBlock();
        this.intervalToolbar.appendChild(intervalsBlock);
        const toolbarButtons = this.intervalToolbar.querySelectorAll('button');
        const customIntervalToolbar = document.getElementById('custom-date-interval');
        const dateInputs = customIntervalToolbar.querySelectorAll('input');
        const intervalDateFromElement = document.getElementById('interval-start-date');
        const intervalDateToElement = document.getElementById('interval-end-date');
        dateInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.getOperations('interval', intervalDateFromElement.value, intervalDateToElement.value);
            })
        })

        toolbarButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                toolbarButtons.forEach(buttonEl => {
                    buttonEl.classList.remove('selected');
                });

                const clickedButton = e.currentTarget;
                clickedButton.classList.add('selected');
                if (clickedButton.id === 'interval') {
                    customIntervalToolbar.style.display = 'flex';
                } else {
                    customIntervalToolbar.style.display = 'none';
                    await this.getOperations(clickedButton.id);
                }
            });
        });
    }

    async getOperations(period = 'today', dateFrom = null, dateTo = null) {
        const response = await OperationsService.getOperations(period, dateFrom, dateTo);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        await this.showOperations(response.operations);
    }

    async showOperations(operations) {
        const recordsElement = document.getElementById('records');
        recordsElement.innerHTML = '';

        for (let i = 0; i < operations.length; i++) {
            const trElement = document.createElement('tr');
            const cell = trElement.insertCell();
            cell.innerText = String(i + 1);
            cell.classList.add("fw-bold");
            cell.style.width = "130px";
            trElement.insertCell().innerHTML = CommonUtils.getOperationType(operations[i].type);
            trElement.insertCell().innerText = operations[i].category;
            trElement.insertCell().innerText = operations[i].amount;
            trElement.insertCell().innerText = operations[i].date;
            trElement.insertCell().innerText = operations[i].comment;
            const actionsCell = trElement.insertCell();
            const actionsDiv = document.createElement("div");
            actionsDiv.classList.add("table-actions-cell");
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<img src="/images/trash-icon.png" alt="trashIcon">';
            deleteButton.addEventListener("click", () => {
                this.showDeleteConfirmationPopup(operations[i].id);
            });
            const editLink = document.createElement("a");
            editLink.href = "/operations/edit?id=" + operations[i].id;
            editLink.innerHTML = '<img src="/images/pen-icon.png" alt="penIcon">';
            actionsDiv.appendChild(deleteButton);
            actionsDiv.appendChild(editLink);
            actionsCell.appendChild(actionsDiv);
            recordsElement.appendChild(trElement);
        }
    }

    findElements() {
        this.modalElement = document.getElementById('delete-modal-dialog');
        this.confirmDeleteButtonElement = document.getElementById('confirm-delete');
        this.cancelDeleteButtonElement = document.getElementById('cancel-delete');
        this.intervalToolbar = document.getElementById('interval-toolbar');
    }

    showDeleteConfirmationPopup(id) {
        this.modalElement.style.display = 'block';
        this.confirmDeleteButtonElement.addEventListener('click', () => {
            this.openNewRoute("/operations/delete?id=" + id);
        });
        this.cancelDeleteButtonElement.addEventListener('click', () => {
            this.modalElement.style.display = 'none';
        });
    }

}