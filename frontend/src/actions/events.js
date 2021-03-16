import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"
import Swal from 'sweetalert2'
export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {

        const {uid, name} = getState().auth;
        try{
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();


            if( body.ok ){
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log( event )
                dispatch( eventAddNew( event ) );
            }
        }catch( error ){
            console.log('ERROR');
        }
        

    } 
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const cleanActiveNote = () => ({
    type: types.eventClearActive
});

export const eventStartUpdate = ( event ) => {
    return async(dispatch) => {
        try{
            const resp = await fetchWithToken(`events/${ event.id }`, event, 'PUT');
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventUpdated( event ) );
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        }catch( error ){
            console.log( error );
        }
    }
}

const eventUpdated = ( e ) => ({
    type: types.eventUpdated,
    payload: e
})

export const eventStartDelete = () => {
    return async(dispatch, getState) =>{
        const { id } = getState().calendar.active;
        try{
            const resp = await fetchWithToken(`events/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if( body.ok ){
                dispatch(eventDeleted());
            }
            else{
                Swal.fire('Error', body.msg, 'error');
            }
           
        }catch( error ){
           console.log(error)
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
})

export const eventStartLoading = () => {
    return async(dispatch) => {
        try{
            const resp = await fetchWithToken('events');
            const body = await resp.json();
            const events = prepareEvents(body.events);
            console.log( events );
            dispatch( eventLoaded( events ));
        }catch( error ){
            console.log( error );
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLogOutPurge = () => ({
    type: types.eventLogOut
})