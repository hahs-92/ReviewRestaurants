import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import styles from '../styles/components/restaurants-list.module.css'



export const ResListSkeleton = () => {
    return(
        
        <article className={ styles.Card }>                             
            <div>
                <div >
                    <h2><Skeleton/></h2>
                    <p> <strong>Cuisine: </strong><Skeleton /> <br/>
                        <strong>Address: </strong><Skeleton />
                    </p>
                </div>
                <div className={ styles.Buttons }>
                    <Link to={ "/"}>
                        View Reviews
                    </Link>
                    <a href={ 'https://www.google.com/maps/place/' } target='_blank' rel="noreferrer" >
                        View Map
                    </a>
                </div>
            </div>
        </article>
       
       
    )
}