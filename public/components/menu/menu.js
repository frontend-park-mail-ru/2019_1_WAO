import template from './menu.tmpl.xml';
import './menu.css';
import './__button/__button.css';

export default class MenuComponent {
    constructor() {
        this.template = template;
    }
    render(data = {}) {
        const buttons = [
                {
                    title: 'Играть онлайн',
                    href: '/',
                },
                {
                    title: 'Играть одному',
                    href: '/',
                },
                {
                    title: 'Магазин',
                    href: '/',
                },
                {
                    title: 'Профиль',
                    href: '/profile',
                },
                {
                    title: 'Таблица лидеров',
                    href: '/users',
                },
                {
                    title: 'Об игре',
                    href: '/',
                },
        ];
        return this.template(buttons);
    }
}