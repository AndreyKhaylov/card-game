import { FC } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../';
import { rootUrl } from '../../rootUrl';

import s from './header.module.css';

interface HeaderProps {
    title: string;
    desc: string;
}

const Header: FC<HeaderProps> = ({ title, desc }) => {
    const history = useHistory();

    const onClickToStartGame = () => {
        history.push(`${rootUrl}/game`);
    };

    return (
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.silhouette}></div>
            <div className={s.moon}></div>
            <div className={s.container}>
                <h1>{title}</h1>
                <p>{desc}</p>
                <Button onClick={onClickToStartGame}>
                    Начать игру
                </Button>
            </div>
        </header>
    )
}

export default Header;
