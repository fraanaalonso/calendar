
import { types } from "../types/types";
/*
{
    id: 'bjhdbcjhbefdhj',
    title: 'Cumpleaños Francisco',
    start: moment().toDate(),
    end: moment().add(2, 'hour').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar la tarta',
    user: {
        _id: '123',
        name: 'Fran'
    }
},*/

const initialState = {
    events: [
        

    ],
    active: null
}


export const calendarReducer = ( state = initialState, action) => {

    switch (action.type) {

        case types.eventSetActive:
            return {
                ...state,
                active: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActive:
            return {
                ...state,
                active: null
            }
        
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.active.id)
                ),
                active: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }

        case types.eventLogOut:
            return {
                ...initialState
            }

        default:
            return state;
    }
}