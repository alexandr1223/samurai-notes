import './css/style.css';
import React, {useRef} from 'react';
import {Sidebar} from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Settings, financePortfolio, Main, Notes} from './pages';
import Board from './pages/ToDoApp/SingleBoard/Board';
import { useDispatch} from 'react-redux';
import { createBoard } from './redux/action/createBoard';

function App() {

    const dispatch = useDispatch();

	const setNewBoard = (item, id) => {
		dispatch(createBoard(item, id))
	}
	
	const wrap = useRef(null);

  	return (
		<div className="wrapper" ref={wrap}>
			<BrowserRouter>
				<Sidebar/>
				<Switch>
					<Route path="/home" component={Main} exact/>
					<Route path="/notes" render={props => <Notes createElement={setNewBoard} />} exact/>
					<Route path="/settings" component={Settings} exact/>
					<Route path="/financePortfolio" component={financePortfolio} exact/>
					<Route path="/notes/board/:id" render={props => <Board wrapRef={wrap} />}  exact/>
				</Switch>
			</BrowserRouter>
		</div>
  	);
}

export default App;
