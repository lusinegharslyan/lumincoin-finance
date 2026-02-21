import {ValidationUtils} from "../../utils/validation-utils";

export class SignUp {
    constructor() {
        this.findElements();
        this.validations = [
            {element: this.nameElement, options: {pattern: /^[А-Я][а-я]+\s*$/}},
            {element: this.lastNameElement, options: {pattern: /^[А-Я][а-я]+\s*$/}},
            {element: this.emailElement, options: {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}},
            {element: this.passwordElement, options: {pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/}},
            {element: this.passwordRepeatElement, options: {compareTo: this.passwordElement.value}},
        ];
        this.processButtonElement.addEventListener('click', this.signUp.bind(this));
    }

    findElements() {
        this.nameElement = document.getElementById('name');
        this.lastNameElement = document.getElementById('lastName');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordErrorElement = document.getElementById('password-error');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.processButtonElement = document.getElementById('process-button');
    }

    signUp() {
        ValidationUtils.validateForm(this.validations);
        this.passwordErrorElement.innerText = this.passwordElement.value ? 'Пароль должен содержать не менее 8 символов:минимум одну заглавную букву и одно число' : 'Заполните пароль'

    }
}
