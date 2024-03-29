import React from 'react';
import Button from './Button';

import { ReactSVG } from 'react-svg';
import IconMinus from '../assets/img/minus.svg';
import IconPlus from '../assets/img/plus.svg';
import IconDel from '../assets/img/del.svg';

const CartItem = ({
    id,
    name,
    imageUrl,
    type,
    size,
    totalPrice,
    totalCount,
    onRemove,
    onMinus,
    onPlus,
}) => {
    const handleRemoveClick = () => {
        onRemove(id);
    };

    const handlePlusItem = () => {
        onPlus(id);
    };

    const handleMinusItem = () => {
        onMinus(id);
    };

    return (
        <div className='cart__item'>
            <div className='cart__item-img'>
                <img
                    className='burger-block__image'
                    src={imageUrl}
                    alt='Burger'
                />
            </div>
            <div className='cart__item-info'>
                <h3>{name}</h3>
                <p>
                    {type} тесто, {size} см.
                </p>
            </div>

            <div className='cart__item-count'>
                <button
                    onClick={handleMinusItem}
                    className='button button--outline button--circle cart__item-count-minus'
                >
                    <ReactSVG src={IconMinus} />
                </button>

                <b>{totalCount}</b>

                <button
                    onClick={handlePlusItem}
                    className='button button--outline button--circle cart__item-count-plus'
                >
                    <ReactSVG src={IconPlus} />
                </button>
            </div>

            <div className='cart__item-price'>
                <b>{totalPrice} ₽</b>
            </div>

            <div className='cart__item-remove'>
                <Button
                    onClick={handleRemoveClick}
                    className='button--circle'
                    outline
                >
                    <ReactSVG src={IconDel} />
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
