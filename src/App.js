import './css/style.css';
import React from 'react';
import {Sidebar} from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home, Settings} from './pages';
import Board from './pages/Board';
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
				<Sidebar createElement={setNewBoard} />
				<Switch>
					<Route path="/" component={Home} exact/>
					<Route path="/settings" component={Settings} exact/>
					<Route path="/board/:id" component={Board} exact/>
				</Switch>
			</BrowserRouter>
		</div>
  	);
}

export default App;
