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
        setUsername(input);
        document.querySelector('dialog').close();
    }

    return (
        <dialog className='modal'>
            <div className='wrapper'>
                <h2 >Please enter your username</h2>
                <input className='username-input' type='text' value={input} onChange={(e) => setInput(e.target.value) } />
                <Button click={sendUsername} text='Submit' />
            </div>
        </dialog>
    )
}
