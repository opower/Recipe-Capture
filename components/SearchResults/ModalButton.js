import React, { useContext } from 'react'
import { AsyncStorage } from 'react-native'
import { Button } from 'galio-framework';
import {ModalContext} from '../../contexts/modalContext'
import { setNumberStorage } from '../helpers/setNumberStorage'

const ModalButton = (props) => {
    const [numberState, setNumberState] = useContext(ModalContext);
    const { modalState, setModalState, setStorage, buttonLabel, setErrorState } = props



    return(
        <Button 
        shadowless size="small" 
        onPress={()=>{setStorage(modalState, setModalState, setErrorState)}}
        style={{alignSelf:'center', backgroundColor:'lightsalmon'}}
        >
        {buttonLabel}
      </Button>

    )
};

export default ModalButton;