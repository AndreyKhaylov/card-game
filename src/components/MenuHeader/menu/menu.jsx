import cn from 'classnames';

import s from './menu.module.css';

const MENU = [
    {
        title: "home",
        to: '#home'
    },
    {
        title: "game",
        to: '#game'
    },
    {
        title: "about",
        to: '#about'
    },
    {
        title: "contact",
        to: '#contact'
    },
];

function Menu({ activeMenu }) {
    
    return (
        <div className={cn(s.menuContainer, {
            [s.active]: activeMenu === true,
            [s.deactive]: !activeMenu === false,
        })}
        >
            <div className={s.overlay} />
            <div className={s.menuItems}>
                <ul>
                    {
                        MENU.map(({title, to}, index) => (
                            <li key={index}>
                                <a href={to}>{title}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Menu;
