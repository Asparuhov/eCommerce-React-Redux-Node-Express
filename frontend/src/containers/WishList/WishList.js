import React from "react";
import classes from "./WishList.module.css";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import WishItem from "./WishItem";
const WishList = (props) => {
  return (
    <>
      {props.wishlist.length > 0 ? (
        <h1 style={{ textAlign: "center", color: "orange" }}>
          Your Wish List:
        </h1>
      ) : (
        <h1
          style={{ textAlign: "center", color: "black" }}
          className={classes.empty}
        >
          Your wish list is empty, go add some items!
        </h1>
      )}
      <div className={classes.Wishlist}>
        {props.wishlist ? (
          props.wishlist.map((item) => {
            return (
              <WishItem
                key={item.id}
                source={item.image}
                info={item.title}
                price={item.price}
                remove={() => props.removeWish(item.id)}
                added={() => {
                  if (props.cart.length === 0) {
                    props.addToCart({
                      info: item.title,
                      id: item.id,
                      price: item.price,
                      image: item.image,
                      count: 1,
                      totalPrice: item.price,
                    });
                  }
                  const index = props.cart.findIndex((x) => x.id === item.id);
                  if (index === -1 && props.cart.length > 0) {
                    props.addToCart({
                      info: item.title,
                      id: item.id,
                      price: item.price,
                      image: item.image,
                      count: 1,
                      totalPrice: item.price,
                    });
                  } else if (index >= 0) {
                    props.increaseCount(item.id);
                    props.clearCart();
                  }
                }}
              />
            );
          })
        ) : (
          <h1>Your don't have items in your wish list... Go add some!!!</h1>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
    wishlist: state.currentWishList,
    cart: state.currentCart,
  };
};
const toActions = (dispatch) => {
  return {
    addToCart: (obj) =>
      dispatch({
        type: "ADDTOCART",
        obj,
      }),
    increaseCount: (id) =>
      dispatch(actions.increaseCount({ id: id, incdec: "increment" })),
    clearCart: () => dispatch(actions.cartClearing()),
    removeWish: (id) => dispatch(actions.removeWish({ id: id })),
  };
};
export default connect(mapStateToProps, toActions)(WishList);
