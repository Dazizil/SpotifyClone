import React, {useState} from 'react';
import '../Modal/Modal.css'

const Modal = () => {
    const [isActive, setIsActive] = useState(true)
    function hideModal() {
        setIsActive(false)
    }
    return (
        <div onClick={()=>hideModal()} className={isActive ?'main-modal-container': 'modal-hided'}>
            <div className={'modal-container'}>

                <div className={'modal-text-container'}>
                <div className={'modal-big-text'}>
                    {'sorry that many functions do not work '.toUpperCase()}
                </div>
                <span className={'modal-small-text'}>{`Spotify API prohibits doing many things without a paid subscription, and novice developers have no money :(`}</span>
                </div>

                <div className={'modal-button-container'}>
                    <button className={'modal-button'}>Got It</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;