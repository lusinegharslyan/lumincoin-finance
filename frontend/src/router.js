import {Main} from "./components/main";
import {Login} from "./components/auth/login";
import {SignUp} from "./components/auth/sign-up";
import {Logout} from "./components/auth/logout";
import {IncomeAndExpensesList} from "./components/income-and-expenses/income-and-expenses-list";
import {IncomeAndExpensesCreate} from "./components/income-and-expenses/income-and-expenses-create";
import {IncomeAndExpensesEdit} from "./components/income-and-expenses/income-and-expenses-edit";
import {IncomeCategories} from "./components/incomes/income-categories";
import {IncomeCategoriesEdit} from "./components/incomes/income-categories-edit";
import {IncomeCategoriesAdd} from "./components/incomes/income-categories-add";
import {IncomeCategoriesDelete} from "./components/incomes/income-categories-delete";
import {ExpenseCategories} from "./components/expenses/expense-categories";
import {ExpenseCategoriesEdit} from "./components/expenses/expense-categories-edit";
import {ExpenseCategoriesAdd} from "./components/expenses/expense-categories-add";
import {ExpenseCategoriesDelete} from "./components/expenses/expense-categories-delete";
import {IncomeAndExpensesDelete} from "./components/income-and-expenses/income-and-expenses-delete";

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
                    new Main();
                },
            },
            {
                route: '/incomes',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/incomes/categories.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCategories();
                },
            },
            {
                route: '/incomes/category/edit',
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/incomes/categories-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCategoriesEdit();
                },
            },
            {
                route: '/incomes/category/add',
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/incomes/categories-add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCategoriesAdd();
                },
            },
            {
                route: '/incomes/category/delete',
                load: () => {
                    new IncomeCategoriesDelete();
                },
            },
            {
                route: '/expenses',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expenses/categories.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseCategories();
                },
            },
            {
                route: '/expenses/category/edit',
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/expenses/categories-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseCategoriesEdit();
                },
            },
            {
                route: '/expenses/category/add',
                title: 'Создание категории расходов',
                filePathTemplate: '/templates/pages/expenses/categories-add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseCategoriesAdd();
                },
            },
            {
                route: '/expenses/category/delete',
                load: () => {
                    new ExpenseCategoriesDelete();
                },
            },
            {
                route: '/income&expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/incomes-and-expenses/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeAndExpensesList();
                },
            },
            {
                route: '/income&expenses/create',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/incomes-and-expenses/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeAndExpensesCreate();
                },
            },
            {
                route: '/income&expenses/edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/incomes-and-expenses/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeAndExpensesEdit();
                },
            },
            {
                route: '/income&expenses/delete',
                load: () => {
                    new IncomeAndExpensesDelete();
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
                    new Login();
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                useLayout: false,
                load: () => {
                    new SignUp();
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout();
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
            if (!url || (currentRoute === url.replace('#', '')) ) {
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
                    console.log(this.navbarBurgerElement);
                    this.sidebarElement = document.getElementById('sidebar');
                    this.contentLayoutElement = document.getElementById('content-layout');
                    console.log(this.sidebarElement);
                    this.navbarBurgerElement.addEventListener('click', this.showSidebar.bind(this));
                } else {
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