import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import RestaurantDataService from '../services/restaurant'

//ESTILOS
import styles from '../styles/components/restaurants.module.css'

export const Restaurants = (props) => {
    const initialRestaurantState = {
        id: null,
        name: '',
        address: {},
        cuisine: '',
        reviews: []
    }

    const [ restaurant, setRestaurant ] = useState(initialRestaurantState)

    const getRestaurant = id => {
        RestaurantDataService.get(id)
            .then(response => {
                setRestaurant(response.data)
            })
            .catch(e => console.error(e))
    }

    useEffect(() => {
        getRestaurant(props.match.params.id)
        // console.log("userId: ", props.user.id )
    }, [props.match.params.id])

    const deleteReview = (reviewId, index) => {
        RestaurantDataService.deleteReview(reviewId, props.user.id)
            .then(response => {
                setRestaurant((prevState) => {
                    prevState.reviews.splice(index, 1) //INDEX ES EL ITEMPOSITION A ELIMINAR, Y EL 1 LA CANTIDAD 
                    return({
                        ...prevState
                    })
                })
            })
            .catch(e => console.error(e))
    }    
    return(
        <>
            {
                restaurant ? (
                    <article className={ styles.Card } >
                        <section className={ styles.CardWrapper }>
                            <div>
                                <h3>{ restaurant.name }</h3>
                                <p>
                                    <strong>Cuisine: </strong>{ restaurant.cuisine } <br/>
                                    <strong>Address: </strong>{ restaurant.address.building } { restaurant.address.street }, { restaurant.address.zipcode }
                                </p>
                            </div>
                            <div className={ styles.Button }>
                                <Link to={ '/restaurants/' + props.match.params.id + "/review" }>
                                    Add Review
                                </Link>
                            </div>
                        </section>

                        {/* <h3>Reviews</h3> */}

                        <section className={ styles.Reviews }>
                            { restaurant.reviews.length > 0 ? (
                                restaurant.reviews.map((review, index) => {
                                    return(
                                        <article key={ index } className={ styles.ReviewCard }>
                                            <div>
                                                <div>
                                                    <p>
                                                        { review.text } <br/>
                                                        <strong>User: </strong>{ review.name } <br/>
                                                        <strong>Date: </strong>{ review.date }
                                                    </p>
                                                </div>
                                                { props.user && props.user.id === review.user_id &&
                                                    <div className={ styles.Button }>
                                                    
                                                        <Link to={{
                                                            pathname: '/restaurants/' + props.match.params.id + '/review',
                                                            state: {
                                                                currentReview: review
                                                            }
                                                        }}>Edit</Link>

                                                        <button type='button' onClick={ () => deleteReview(review._id, index) }>Delete</button>
                                                    </div>
                                                }
                                                

                                            </div>
                                        </article>
                                    )
                                })
                            ) : (
                                <div>
                                    <p>No reviews yet</p>
                                </div>
                            )}
                        </section>
                    </article>
                ) : (
                    <div>
                        <br/>
                        <p>No restaurants selected</p>
                    </div>
                )
            }
        </>
        
    )
}