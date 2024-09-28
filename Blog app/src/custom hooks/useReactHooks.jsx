import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const useReactHooks = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    return {
        dispatch,navigate
    }
}

export default useReactHooks