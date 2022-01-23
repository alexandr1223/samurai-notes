import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Sidebar, Settings, financePortfolio, Main, Notes, Login, Register} from '../pages';
import Board from '../pages/ToDoApp/SingleBoard/Board';
import { createBoard } from '../redux/action/createBoard';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import FinancePortfolio from '../pages/FinancePortfolio/FinancePortfolio';

export default function Router({wrapRef}) {

    const dispatch = useDispatch();
    const setNewBoard = (item, id) => {
		dispatch(createBoard(item, id))
	}

    return (
        <BrowserRouter>
            <Sidebar/>
            <Switch>
                <Route path="/home" component={Main} exact/>

                <PrivateRoute path="/notes" exact>
                    <Notes createElement={setNewBoard} />
                </PrivateRoute>
                <PrivateRoute path="/notes/board/:id">
                    <Board wrapRef={wrapRef} />
                </PrivateRoute>
                <PrivateRoute path="/settings">
                    <Settings />
                </PrivateRoute>
                <PrivateRoute path="/financePortfolio">
                    <FinancePortfolio />
                </PrivateRoute>

                <PublicRoute path="/login">
                    <Login />
                </PublicRoute>
                <PublicRoute path="/register">
                    <Register />
                </PublicRoute>
            </Switch>
        </BrowserRouter>
    );
}
