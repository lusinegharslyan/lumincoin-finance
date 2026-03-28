import {Main} from "./components/main";
import {Login} from "./components/auth/login";
import {SignUp} from "./components/auth/sign-up";
import {Logout} from "./components/auth/logout";
import {OperationsList} from "./components/operations/operations-list";
import {OperationsCreate} from "./components/operations/operations-create";
import {OperationsEdit} from "./components/operations/operations-edit";
import {OperationsDelete} from "./components/operations/operations-delete";
import {AuthUtils} from "./utils/auth-utils";
import {BalanceService} from "./services/balance-service";
import {CategoriesList} from "./components/categories/categories-list";
import config from "./config/config";
import {CategoriesAdd} from "./components/categories/categories-add";
import {CategoriesDelete} from "./components/categories/categories-delete";
import {CategoriesEdit} from "./components/categories/categories-edit";

export class Router {
    constructor() {
        this.initEvents();
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/categories/categories.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesList(config.operationTypes.income, this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income/category/edit',
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/categories/categories-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesEdit(config.operationTypes.income,this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income/category/add',
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/categories/categories-add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesAdd(config.operationTypes.income,this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income/category/delete',
                load: () => {
                    new CategoriesDelete(config.operationTypes.income,this.openNewRoute.bind(this));
                },
            },
            {
                route: '/expense',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/categories/categories.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesList(config.operationTypes.expense,this.openNewRoute.bind(this));
                },
            },
            {
                route: '/expense/category/edit',
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/categories/categories-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesEdit(config.operationTypes.expense,this.openNewRoute.bind(this));
                },
            },
            {
                route: '/expense/category/add',
                title: 'Создание категории расходов',
                filePathTemplate: '/templates/pages/categories/categories-add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesAdd(config.operationTypes.expense,this.openNewRoute.bind(this));
                },
            },
            {
                route: '/expense/category/delete',
                load: () => {
                    new CategoriesDelete(config.operationTypes.expense,this.openNewRoute.bind(this));
                },
            },
            {
                route: '/operations',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/operations/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new OperationsList(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/operations/create',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/operations/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new OperationsCreate(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/operations/edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/operations/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new OperationsEdit(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/operations/delete',
                load: () => {
                    new OperationsDelete(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false,
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    new Login(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                useLayout: false,
                load: () => {
                    new SignUp(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                }
            },
        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        if (this.navbarBurgerElement && this.sidebarElement) {
            if (!this.navbarBurgerElement.contains(e.target) && this.contentLayoutElement.contains(e.target)) {
                this.sidebarElement.classList.remove('show-sidebar');
            }
        }
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }
        if (element) {
            e.preventDefault();
            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', ''))) {
                return;
            }

            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            const currentRoute = this.routes.find(route => route.route === oldRoute);
        }
        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
            }
            if (newRoute.filePathTemplate) {
                let contentBlock = this.contentPageElement;
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                    this.navbarBurgerElement = document.getElementById('navbar-burger');
                    this.sidebarElement = document.getElementById('sidebar');
                    this.contentLayoutElement = document.getElementById('content-layout');
                    this.navbarBurgerElement.addEventListener('click', this.showSidebar.bind(this));
                    this.setUserInfo();
                    await this.setBalance();
                }
                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                this.activateMenuItem(newRoute);
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }

        } else {
            console.log('No route found');
            history.pushState({}, '', '/404');
            await this.activateRoute();
        }
    };

    async setBalance() {
        this.balanceBlockElement = document.getElementById('balance-block');
        this.balanceBlockElement.addEventListener("click", this.changeBalance.bind(this));
        this.balanceElement = document.getElementById('balance');
        const result = await BalanceService.getBalance();
        if (result) {
            this.balanceElement.innerText = result.balance;
        }
    }

    changeBalance() {
        this.balancePopupElement = document.getElementById('balance-modal-dialog');
        this.balanceInputElement = document.getElementById('balance-input');
        this.saveBalanaceButtonElement = document.getElementById('save-balance');
        this.cancelBalanceChangeButtonElement = document.getElementById('cancel-balance-change');
        this.balanceInputElement = document.getElementById('balance-input');
        this.balanceInputElement.value = this.balanceElement.innerText;
        this.balancePopupElement.style.display = 'block';
        this.saveBalanaceButtonElement.addEventListener('click', this.saveBalance.bind(this));
        this.cancelBalanceChangeButtonElement.addEventListener('click', () => {
            this.balancePopupElement.style.display = 'none';
        });

    }

    async saveBalance() {
        this.saveBalanceErrorElement = document.getElementById('save-balance-error');
        this.saveBalanceErrorElement.style.display = 'none';
        const result = await BalanceService.updateBalance(this.balanceInputElement.value);
        if (result) {
            this.balanceElement.innerText = result.balance;
            this.balancePopupElement.style.display = 'none';
        } else {
            this.saveBalanceErrorElement.style.display = 'block';
        }
    }

    setUserInfo() {
        this.profileNameElement = document.getElementById('profile-name');
        if (!this.userInfo) {
            let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
                if (userInfo.name && userInfo.lastName) {
                    this.userInfo = userInfo.name + ' ' + userInfo.lastName;
                }
            }
        }
        this.profileNameElement.innerText = this.userInfo;
    }

    activateMenuItem(route) {
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            const href = item.getAttribute('href');
            if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        })
    }

    showSidebar() {
        this.sidebarElement.classList.toggle('show-sidebar');
        this.navbarBurgerElement.style.display = 'none';
    }
}