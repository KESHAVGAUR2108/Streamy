import React from 'react';
import ReactDOM  from 'react-dom';

const Modal = props => {

    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui blurring segment dimmer modals visible active">
            <div className="ui standard modal visible active">
                <div onClick={(e) => e.stopPropagation()} className="ui center aligned basic segment">
                    <h2 className="ui header">{props.content}</h2>
                    <div className='actions'>{props.actions}</div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Modal;
