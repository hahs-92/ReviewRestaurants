import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//COMPONENTS
import RestaurantDataService from '../services/restaurant'
import { ResListSkeleton } from './res-list-skeleton'

//ESTILOS
import styles from '../styles/components/restaurants-list.module.css'



export const RestaurantsList = (props) => {
    const [ restaurants, setRestaurants ] = useState([])
    const [ searchName, setSearchName ] = useState('')
    const [ searchZip, setSearchZip ] = useState('')
    const [ searchCuisine, setSearchCuisine ] = useState('')
    const [ cuisines, setCuisines ] = useState(['All Cuisines'])
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        retrieveRestaurants()
        retrieveCuisines()
    }, [])

    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const onChangeSearchZip = e => {
        const searchZip = e.target.value
        setSearchZip(searchZip)
    }

    const onChangeSearchCuisine = e => {
        const searchCuisine = e.target.value
        setSearchCuisine(searchCuisine)
    }

    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                // console.log("DATA: ", response.data)
                setRestaurants(response.data.restaurants)
                setLoading(true)
            })
            .catch(e => console.error(e))
    }

    const retrieveCuisines = () => {
        RestaurantDataService.getCuisines()
            .then(response => {
                // console.log("CUISINES: ", response.data)
                setCuisines(['All Cuisines'].concat(response.data))
            })
            .catch(e => console.error(e))
    }

    const refreshList = () => {
        retrieveRestaurants()
    }

    const find = (query, by) => {
        RestaurantDataService.find(query, by)
            .then(response => {
                // console.log(response.data)
                setRestaurants(response.data.restaurants)
            })
            .catch(e => console.error(e))
    }

    const findByName = () => {
        find(searchName, 'name')
    }

    const findByZip = () => {
        find(searchZip, 'zipcode')
    }

    const findByCuisine = () => {
        if(searchCuisine === 'All Cuisines') {
            refreshList()
        } else {
            find(searchCuisine, 'cuisine')
        }
    }

    return(
        <article className={ styles.Restaurants }>
            <section className={ styles.Wrapper } >
                <div className={ styles.InputWrapper }>
                   <label htmlFor='search'>.
                      <input 
                            type="text"
                            placeholder='Search by name'
                            value={ searchName }
                            onChange={ onChangeSearchName }   
                            id='search' 
                    />
                   </label>
                </div>

                <div className={ styles.ButtonWrapper }>
                    <button 
                        type='button'
                        onClick={ findByName }
                    >
                        Search
                    </button>
                </div>
            </section>

            {/* <section className={ styles.Wrapper }>
                <div className={ styles.InputWrapper }>
                    <input 
                        type="text"
                        placeholder='Search by zip'
                        value={ searchZip }
                        onChange={ onChangeSearchZip }
                    />
                </div>
                <div className={ styles.ButtonWrapper }>
                    <button type='button' onClick={ findByZip }>
                        Search
                    </button>
                </div>
            </section> */}

            {/* <section  className={ styles.Wrapper }>
                <div className={ styles.SelectWrapper }>
                    <select onChange={ onChangeSearchCuisine } >
                        {
                            cuisines.map(cuisine => {
                                return (
                                    <option key={ cuisine } value={ cuisine }>
                                        { cuisine.substr(0, 20) }
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={ styles.ButtonWrapper }>
                    <button type='button' onClick={ findByCuisine }>
                        Search
                    </button>
                </div>
            </section> */}

            {
                loading ?
                <section className={ styles.WrapperList }>
                    {
                        restaurants.map((restaurant => {
                            const address = `${ restaurant.address.building } ${ restaurant.address.street }, ${ restaurant.address.zipcode }`
                            return(
                                <article key={ restaurant._id } className={ styles.Card }>
                                    
                                    <div>
                                        <div >
                                            <h2>{ restaurant.name }</h2>
                                            <p> <strong>Cuisine: </strong>{ restaurant.cuisine } <br/>
                                                <strong>Address: </strong>{ address }
                                            </p>
                                        </div>
                                        <div className={ styles.Buttons }>
                                            <Link to={ "/restaurants/"+restaurant._id }>
                                                View Reviews
                                            </Link>
                                            <a href={ 'https://www.google.com/maps/place/' + address } target='_blank' rel="noreferrer" >
                                                View Map
                                            </a>
                                        </div>
                                    </div>
                                
                                </article>
                            )
                        }))
                    }
                </section>
                : 
                    <section className={ styles.WrapperList }>
                       {
                           [1,2,3,4,5,6,7,8,9,10].map(item => (
                               <ResListSkeleton key={ item }/>
                           ))
                       }
                    </section>
            }

        </article>
    )
}