import { useState } from 'react'
import { Link } from 'react-router-dom'

import RestaurantDataService from '../services/restaurant'

//ESTILOS
import styles from '../styles/components/add-reviews.module.css'


export const AddReviews = (props) => {
    let initialReviewState = ''
    let editing = false

    if(props.location.state && props.location.state.currentReview) {
        editing = true
        initialReviewState = props.location.state.currentReview.text
    }

    const [ review, setReview ] = useState(initialReviewState)
    const [ submitted, setSubmitted ] = useState(false)

    const handleInputChange = event => {
        setReview(event.target.value)
    }

    const saveReview = () => {
        let data = {
            text: review,
            name: props.user.name,
            user_id: props.user.id,
            restaurant_id: props.match.params.id
        }

        if(editing) {
            data.review_id = props.location.state.currentReview._id
            RestaurantDataService.updateReview(data)
                .then(response => setSubmitted(true))
                .catch(e => console.error(e))
        } else {
            RestaurantDataService.createReview(data)
                .then(response => setSubmitted(true))
                .catch(e => console.error(e))
        }
    }
    return(
        <article className={ styles.AddReview }>
            {
                props.user ? (
                    <section className={ styles.AddReviewWrapper } >
                        {
                            submitted ? (
                                <div>
                                    <h2>You submitted successfully¡</h2>
                                    <div className={ styles.Button }>
                                        <Link to={ '/restaurants/' + props.match.params.id} >
                                            Back to Restaurant
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className={ styles.Inputs }>
                                        <label htmlFor="description">{ editing ? 'Edit' : 'Create' } Review</label>
                                        <input 
                                            type="text" 
                                            id='text' 
                                            required 
                                            value={ review } 
                                            onChange={ handleInputChange }
                                            name='text'
                                            />
                                    </div>
                                    <div >
                                        <button onClick={ saveReview } className={ styles.Button }>
                                            Submit
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    </section>
                ) : (
                    <div>
                        <h1>Please Login</h1>
                    </div>
                )
            }
        </article>
    )
}