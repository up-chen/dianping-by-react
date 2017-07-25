import React from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
const ParamsExample = ({match}) => (
    <div>
      <h2>Accounts</h2>
      <ul>
        <li><Link to={`${match.url}/netflix`}>Netflix</Link></li>
        <li><Link to={`${match.url}/zillow-group`}>Zillow Group</Link></li>
        <li><Link to={`${match.url}/yahoo`}>Yahoo</Link></li>
        <li><Link to={`${match.url}/modus-create1`}>Modus Create</Link></li>
      </ul>
      <ul>
        <ListItemLink to={`${match.url}/somewhere`} />
        <ListItemLink to={`${match.url}/somewhere-ele`} />
      </ul>

        <Route path={`${match.url}/:id`} component={Child}/>
    </div>
)

class Child extends React.Component {
    render() {
        return (
            <div>
              <h3>ID: {this.props.match.params.id}</h3>
            </div>
        )
    }
}

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      {match ? '>' : ''}<Link to={to} {...rest}>somewhere</Link>
    </li>
  )}/>
)

export default ParamsExample