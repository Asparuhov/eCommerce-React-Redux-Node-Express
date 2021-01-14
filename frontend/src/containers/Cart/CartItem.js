import React from 'react'
import classes from './CartItem.module.css';
export default function CartItem(props) {
    return (
        <div className={classes.CartItem}>
            <img src={props.image} alt='error' />
            <p>About: {props.info}</p>
            <p>count:{props.count}</p>
            <p>total price: ${props.totalPrice}</p>
        </div>
    )
}
