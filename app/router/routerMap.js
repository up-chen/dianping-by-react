import React from 'react'
import {BrowserRouter as Router, Route, IndexRoute, Link } from 'react-router-dom'

import App from '../containers/App'
import Hello from '../containers/Hello'
import ParamsExample from '../containers/ParamsExample'
import TodoList from '../containers/TodoList'

class RouteMap extends React.Component {    
    render() {
        return (
            <Router>
            <div>
                <Route exact path='/' component={Home} />
                <Route path='/todolist' component={TodoList} />
                <Route path='/paramsExample' component={ParamsExample} />
                <Route path='/hello' component={Hello} />
            </div>
            </Router>
        )
    }
}

const Home = ({match}) => {
    const arr = ['/todolist', '/paramsExample', '/hello']
    return (<ul>
        {arr.map((vaule,index) =>{
            return <li key={index}><Link to={vaule}>{vaule}</Link></li>
        })}
    </ul>)
}


export default RouteMap