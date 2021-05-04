import { useState } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import './App.css'

//COMPONETS
import { Restaurants } from './components/restaurants'
import { RestaurantsList } from './components/restaurants-list'
import { Login } from './components/login'
import { AddReviews } from './components/add-reviews'


function App() {
  const [ user, setUser ] = useState(null)

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }  

  return (
    <section>
      <nav>
        <a href="/restaurants">Restaurants Review</a>
        <div>
          <li>
            <Link to={ '/restaurants' }>Restaurants</Link>
          </li>
          <li>
            {
              user ? (
                <a onClick={ logout }>
                  Logout { user.name}
                </a>
              ) : (
                <Link to='/login'>Login</Link>
              )
            }
          </li>
        </div>
      </nav>

      <section>
        <Switch>
          <Route exact path={ ['/', '/restaurants'] } component={ RestaurantsList } />
        
          <Route path='/restaurants/:id/review' render={ (props) => (
            <AddReviews { ...props } user={ user } />
          )} 
          />
          <Route path='/restaurants/:id' render={ (props) => (
            <Restaurants { ...props } user={ user } />
          )} 
          />
          <Route path='/login' render={ (props) => (
            <Login { ...props } login={ login } />
          )} 
          />
        </Switch>
      </section>
    </section>
  );
}

export default App;
