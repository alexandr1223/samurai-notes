import { Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
  
function PublicRoute({ children, ...rest }) {

    const isLoaded = useSelector(({auth}) => auth.isLoaded)
    const history = useHistory();
    console.log(isLoaded)

    return (
        <Route
            {...rest}
            render={() => {
                const url = new URLSearchParams(history.location.search.slice(1));
                console.log(url)
                return isLoaded ? (
                    <Redirect to={url.get("redirect") || "/"} />
                ) : (
                    children
                );
            }}
        />
    );
}
  
  export default PublicRoute;