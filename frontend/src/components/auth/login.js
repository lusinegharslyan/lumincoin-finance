import {ValidationUtils} from "../../utils/validation-utils";

export class Login {
    constructor() {
        this.findElements();
        this.validations = [
            {element: this.emailElement, options: {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}},
            {element: this.passwordElement},
        ];
        this.processButtonElement.addEventListener('click', this.login.bind(this));
    }

    findElements() {
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember');
        this.processButtonElement = document.getElementById('process-button');
    }

    login() {
        ValidationUtils.validateForm(this.validations);
    }
}