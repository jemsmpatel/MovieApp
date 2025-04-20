import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    return <>
        {isOpen && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="absolute top-[30%] left-[13%] bg-white p-4 pt-2 rounded-lg z-10 text-right">
                    <button className='text-black h-12 w-16 font-semibold hover:text-gray-700 focus:outline-none mr-2' onClick={onClose}>
                        X
                    </button>
                    {children}
                </div>
            </div>
        )}
    </>
};

export default Modal;