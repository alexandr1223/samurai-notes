import './css/style.css';
import React from 'react';
import {Sidebar} from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home, Settings, Board} from './pages';
import { useDispatch} from 'react-redux';
import { createBoard } from './redux/action/createBoard';

function App() {

    const dispatch = useDispatch();

	const setNewBoard = (item) => {
		dispatch(createBoard(item))
	}
	
  	return (
		<div className="wrapper">
			<BrowserRouter>
				<Sidebar createElement={setNewBoard} />
				<Switch>
					<Route path="/" component={Home} exact/>
					<Route path="/settings" component={Settings} exact/>
					<Route path="/board" component={Board} exact/>
				</Switch>
			</BrowserRouter>
		</div>
  	);
}

export default App;
