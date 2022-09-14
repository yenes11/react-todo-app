import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../button/Button';
import './Modal.css';
import { GlobalContext } from '../../context/GlobalState';

export const Modal = () => {
    const [input, setInput] = useState('');
    const { username, setUsername } = useContext(GlobalContext);

    useEffect(() => {
        if (username === null) 
            document.querySelector('dialog').showModal();
    }, [username]);

    const sendUsername = () => {
        if (input.length < 3)
            document.querySelector('.user-message').style.opacity = '1';
        else {
            setUsername(input);
            document.querySelector('dialog').close();
        }
    }

    const preventCancel = (e) => {
        e.preventDefault();
    }

    const trackUsername = (e) => {
        e.preventDefault();
        console.log(input)
        if (input.length >= 2)
            document.querySelector('.user-message').style.opacity = '0';
        setInput(e.target.value);
    }

    return (
        <dialog onCancel={preventCancel} className='modal'>
            <div className='wrapper'>
                <h2 >Please enter your username</h2>
                <div>
                    <input className='username-input' type='text' value={input} onChange={trackUsername} placeholder='Enes Yurtsever' />
                    <span className='user-message'>*Username must contain at least 3 character</span>
                </div>
                <Button click={sendUsername} text='Submit' />
            </div>
        </dialog>
    )
}
