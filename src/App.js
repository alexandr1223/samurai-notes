import './css/style.css';
import React from 'react';
import {Sidebar} from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Notes, Settings, financePortfolio} from './pages';
import Board from './pages/board/Board';
import { useDispatch} from 'react-redux';
import { createBoard } from './redux/action/createBoard';

function App() {

    const dispatch = useDispatch();

	const setNewBoard = (item, id) => {
		dispatch(createBoard(item, id))
	}
	
  	return (
		<div className="wrapper">
			<BrowserRouter>
				<Sidebar/>
				<Switch>
					<Route path="/notes" render={props => <Notes createElement={setNewBoard} />} exact/>
					<Route path="/settings" component={Settings} exact/>
					<Route path="/financePortfolio" component={financePortfolio} exact/>
					<Route path="/board/:id" component={Board} exact/>
				</Switch>
			</BrowserRouter>
		</div>
  	);
}

export default App;
