import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es';
import { NavBar } from '../ui/NavBar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-español';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { cleanActiveNote, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer


export const CalendarScreen = () => {

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')
    const dispatch = useDispatch();

    //read events store

    const { events, active } = useSelector(state => state.calendar);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelect = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setlastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch( cleanActiveNote() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
        }

        return {
            style
        }
    }
    
    return (
        <div className="calendar-screen">
            <NavBar />

            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end" 
                events={events}
                messages={messages}
                eventPropGetter={ eventStyleGetter}
                onSelectEvent={ onSelect}
                onView={ onViewChange }
                onSelectSlot = { onSelectSlot}
                selectable={ true }
                view={ lastView }
                onDoubleClickEvent={ onDoubleClick }
                components = {{
                    event: CalendarEvent 
                }}
               
            />

            <AddNewFab />
            
            {
                active && <DeleteEventFab />
            }
            
            

            <CalendarModal />
        </div>
    )
}
