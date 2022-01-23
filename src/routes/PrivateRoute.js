import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
  
function PrivateRoute({ children, ...rest }) {

    const isLoaded = useSelector(({auth}) => auth.isLoaded)
    console.log(isLoaded)
    return (
        <Route
            {...rest}
            render={({ location }) => {
                const url = new URLSearchParams();
                url.set('redirect', location.pathname + location.search);
                
                return isLoaded ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            search: url.toString(),
                        }}
                    />
                )
            }}
        />
    );
}
  
  export default PrivateRoute;