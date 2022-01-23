import './css/style.css';
import React, {useRef} from 'react';
import Router from './routes/Router';
import { useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import { isLoaded } from './redux/action/Auth/auth';
import api from './services/api'

function App() {

    const dispatch = useDispatch();
	// Определение наличия токена в куках
	Cookies.get('auth-token') ? dispatch(isLoaded(true)) : dispatch(isLoaded(false))
	

	// const loadData = useCallback(async () => {
	// 	const tokenData = Cookies.get("auth-token");
	
	// 	try {
	// 	  if (tokenData) {
	// 		const { data } = await api.auth.getProfile();
	// 		console.log(data)
	// 	  }
	// 	} catch {
	// 		console.log('catch')
	// 	} finally {
	// 		console.log('isloaded')
	// 	}
	//   }, []);
	
	// useEffect(() => {
	// 	loadData();
	// }, [loadData]);
	
	const wrap = useRef(null);

  	return (
		<div className="wrapper" ref={wrap}>
			<Router wrapRef={wrap} />
		</div>
  	);
}

export default App;
