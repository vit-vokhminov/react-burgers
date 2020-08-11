import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {ReactSVG} from 'react-svg'
import IconCart from '../assets/img/cart.svg';
import IconCartClear from '../assets/img/trash.svg';
import IconArrowLeft from '../assets/img/grey-arrow-left.svg';

import cartEmptyImage from '../assets/img/empty-cart.png';
import {CartItem, Button} from '../components';
import {clearCart, removeCartItem, plusCartItem, minusCartItem} from '../redux/actions/cart';

function Cart() {
    const dispatch = useDispatch();
    const {totalPrice, totalCount, items} = useSelector(({cart}) => cart);

    const addedBurgers = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const onClearCart = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
            dispatch(clearCart());
        }
    };

    const onRemoveItem = (id) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            dispatch(removeCartItem(id));
        }
    };

    const onPlusItem = (id) => {
        dispatch(plusCartItem(id));
    };

    const onMinusItem = (id) => {
        dispatch(minusCartItem(id));
    };

    const onClickOrder = () => {
        console.log('ВАШ ЗАКАЗ', items);
    };

    return (
        <div className="content">
            <div className="container container--cart">
                {totalCount ? (
                    <div className="cart">
                        <div className="cart__top">
                            <h2 className="content__title">
                                <ReactSVG src={IconCart}/>
                                Корзина
                            </h2>
                            <div className="cart__clear">
                                <ReactSVG src={IconCartClear}/>
                                <span onClick={onClearCart}>Очистить корзину</span>
                            </div>
                        </div>
                        <div className="content__items">
                            {addedBurgers.map((obj) => (
                                <CartItem
                                    key={obj.id}
                                    id={obj.id}
                                    name={obj.name}
                                    type={obj.type}
                                    size={obj.size}
                                    totalPrice={items[obj.id].totalPrice}
                                    totalCount={items[obj.id].items.length}
                                    onRemove={onRemoveItem}
                                    onMinus={onMinusItem}
                                    onPlus={onPlusItem}
                                />
                            ))}
                        </div>
                        <div className="cart__bottom">
                            <div className="cart__bottom-details">
                                <span>Всего пицц: <b>{totalCount} шт.</b></span>
                                <span>Сумма заказа: <b>{totalPrice} ₽</b></span>
                            </div>
                            <div className="cart__bottom-buttons">
                                <a href="/" className="button button--outline button--add go-back-btn">
                                    <ReactSVG src={IconArrowLeft}/>
                                    <Link to="/"><span>Вернуться назад</span></Link>
                                </a>
                                <Button onClick={onClickOrder} className="pay-btn">
                                    <span>Оплатить сейчас</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cart cart--empty">
                        <h2>Корзина пуста</h2>
                        <p>Вероятней всего, вы не заказывали ещё пиццу.<br/>
                            Для того, чтобы заказать пиццу, перейди на главную страницу.
                        </p>
                        <img src={cartEmptyImage} alt="Empty cart"/>
                        <Link to="/" className="button button--black">
                            <span>Вернуться назад</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
