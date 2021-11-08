import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

import { ReactSVG } from 'react-svg';
import IconPlus from '../../assets/img/plus.svg';

function BurgerBlock({
    id,
    name,
    imageUrl,
    price,
    types,
    sizes,
    onClickAddBurger,
    addedCount,
}) {
    const availableTypes = ['Со свининой', 'С цыпленком'];
    const availableSizes = ['Мини', 'Слайдер', 'TRUMP'];

    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(0);

    const onSelectType = (index) => {
        setActiveType(index);
    };

    const onSelectSize = (index) => {
        setActiveSize(index);
    };

    const onAddBurger = () => {
        const obj = {
            id,
            name,
            imageUrl,
            price,
            size: availableSizes[activeSize],
            type: availableTypes[activeType],
        };

        onClickAddBurger(obj);
    };

    return (
        <div className='burger-elem'>
            <div className='burger-main'>
                <div className='flex-elem-wrap'>
                    <img
                        className='burger-block__image'
                        src={imageUrl}
                        alt='Burger'
                    />
                    <h4 className='burger-block__title'>{name}</h4>
                </div>
                <div className='flex-elem-wrap'>
                    <div className='burger-block__selector'>
                        <ul>
                            {availableTypes.map((type, index) => (
                                <li
                                    key={type}
                                    onClick={() => onSelectType(index)}
                                    className={classNames({
                                        active: activeType === index,
                                        disabled: !types.includes(index), // если в types.includes нет index
                                    })}
                                >
                                    {type}
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {availableSizes.map((size, index) => (
                                <li
                                    key={size}
                                    onClick={() => onSelectSize(index)}
                                    className={classNames({
                                        active: activeSize === index,
                                        disabled: !sizes.includes(size),
                                    })}
                                >
                                    {size}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='burger-block__bottom'>
                        <div className='burger-block__price'>от {price} ₽</div>
                        <Button onClick={onAddBurger} className='button--add'>
                            <ReactSVG
                                src={IconPlus}
                                wrapper='span'
                                className='button_icon'
                            />
                            <span>Добавить</span>
                            {addedCount && <i>{addedCount}</i>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BurgerBlock;
