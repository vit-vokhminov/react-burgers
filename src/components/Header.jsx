import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactSVG } from 'react-svg';
import IconCart from '../assets/img/cart.svg';

import logoSvg from '../assets/img/logo.png';
import Button from './Button';

function Header() {
    const { totalPrice, totalCount } = useSelector(({ cart }) => cart);

    return (
        <div className='header'>
            <div className='header_cont'>
                <Link to='/' className='header__logo'>
                    <div className='header__logo_cont'>
                        <img width='38' src={logoSvg} alt='Burger logo' />
                        <div>
                            <h1>React Burgers</h1>
                            <p>самые вкусные бургеры во вселенной</p>
                        </div>
                    </div>
                </Link>

                <div className='header__cart'>
                    <Link to='/cart'>
                        <Button className='button--cart'>
                            <span>{totalPrice} ₽</span>
                            <div className='button__delimiter'></div>
                            <ReactSVG
                                src={IconCart}
                                wrapper='span'
                                className='button_icon'
                            />
                            <span>{totalCount}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
