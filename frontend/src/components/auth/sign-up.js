import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";

export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }
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
        this.commonErrorElement = document.getElementById('common-error');
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        for (let i = 0; i < this.validations.length; i++) {
            if (this.validations[i].element === this.passwordRepeatElement) {
                this.validations[i].options.compareTo = this.passwordElement.value;
            }
        }
        if (ValidationUtils.validateForm(this.validations)) {
            const signUpResult = await AuthService.signUp({
                name: this.nameElement.value,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.passwordRepeatElement.value,
            })
            if (signUpResult) {
                const loginResult = await AuthService.login({
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                })
                if (loginResult) {
                    AuthUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, loginResult.user);
                    return this.openNewRoute('/');
                }
            }
            this.commonErrorElement.style.display = 'block';
        } else {
            this.passwordErrorElement.innerText = this.passwordElement.value ? 'Пароль должен содержать не менее 8 символов:минимум одну заглавную букву и одно число' : 'Заполните пароль'
        }
    };
}
