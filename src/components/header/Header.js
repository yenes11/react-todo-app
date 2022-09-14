import React, { useState, useEffect, useContext } from 'react'
import './Header.css';
import { GlobalContext } from '../../context/GlobalState';
import { ReactComponent as ThemeLight } from './theme-dark.svg';
import { ReactComponent as ThemeDark } from './theme-light.svg';

export const Header = ({ theme, toggleTheme }) => {
    const [date, setDate] = useState('');
    const { username } = useContext(GlobalContext);
    
    useEffect(() => {
        var _date = new Date();
        var dateString = _date.toDateString();
        setDate(dateString);
    }, [])

    const changeTheme = (e) => {
        e.preventDefault();
        toggleTheme();
    }

    return (
    <div className='header'>
        { theme === 'dark' ? (
            <ThemeLight className='toggle-theme' onClick={changeTheme} />
        ) : (
            <ThemeDark className='toggle-theme' onClick={changeTheme} />
        ) }
        <div className='name'>{ username }</div>
        <div className='date'>{date}</div>
    </div>
    )
}
