import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
export const AppRouter = () => {
    return (
        <>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={LoginScreen} />
                        <Route exact path="/calendar" component={CalendarScreen} />

                        <Redirect to='/login' />
                    </Switch>
                </div>
            </Router>
        </>
    )
}
