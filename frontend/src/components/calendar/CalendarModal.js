import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
//import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { cleanActiveNote, eventStartAddNew, eventStartUpdate } from '../../actions/events';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const end = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    endForm: end.toDate()

}


export const CalendarModal = () => {

   const [dateStart, setdateStart] = useState(now.toDate());
   const {active} = useSelector(state => state.calendar)
   const [endDate, setendDate] = useState( end.toDate() )
   const [titleValid, settitleValid] = useState(true)
   const [formValues, setFormValues] = useState( initEvent );
   const {modalOpen} = useSelector(state => state.ui)
   const dispatch = useDispatch()
   const { notes, title } = formValues;

   useEffect(() => {
       if( active ){
           setFormValues( active );
       }else{
           setFormValues( initEvent );
       }
   }, [ active, setFormValues ]);


   const handleInputChange = ( e ) => {
       setFormValues({
           ...formValues,
           [e.target.name]: e.target.value
       })
   }

  

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(cleanActiveNote());
        setFormValues( initEvent );// we reset the form

    }

    const handleStartDateChange = ( e ) => {
        setdateStart( e );
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = ( e ) => {
        setendDate( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = ( e ) => {
        e.preventDefault();
        //const momentStart = moment( start );
        //const momentEnd = moment( endForm );

        

        if( title.trim().length < 2 ){
            settitleValid( false );
        }

        //cuando edito un evento, el active pasa a contener dicho evento. Si añado, eso no ocurre

        if( active ){
            dispatch( eventStartUpdate(formValues) );
        }
        else{

            dispatch( eventStartAddNew(formValues))
    
            

        }

        settitleValid(true);
        closeModal();

        

    }

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
                <h1> { ( active ) ? 'Editar Evento' : 'Nuevo Evento'} </h1>
                    <hr />
                    <form 
                        className="container"
                        onSubmit={ handleSubmitForm}
                    >

                        <div className="form-group">
                            <label>Fecha y hora inicio</label>
                            <DateTimePicker
                                onChange={handleStartDateChange}
                                value={dateStart}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Fecha y hora fin</label>
                            <DateTimePicker
                                onChange={handleEndDateChange}
                                value={endDate}
                                minDate={ dateStart }
                                className="form-control"
                            />
                        </div>

                        <hr />
                        <div className="form-group">
                            <label>Titulo y notas</label>
                            <input 
                                type="text" 
                                className={`form-control ${ !titleValid && 'is-invalid' } `}
                                placeholder="Título del evento"
                                name="title"
                                autoComplete="off"
                                value={ title }
                                onChange = { handleInputChange }
                            />
                            <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                        </div>

                        <div className="form-group">
                            <textarea 
                                type="text" 
                                className="form-control"
                                placeholder="Notas"
                                rows="5"
                                name="notes"
                                value={ notes }
                                onChange = { handleInputChange }
                            ></textarea>
                            <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block"
                        >
                            <i className="far fa-save"></i>
                            <span> Guardar</span>
                        </button>

                    </form>
        </Modal>
    )
}
