import React from 'react';
import { ReactSVG } from 'react-svg';
import IconArrowTop from '../assets/img/arrow-top.svg';

const SortPopup = React.memo(function SortPopup({
    items,
    activeSortType,
    onClickSortType,
}) {
    const [visiblePopup, setVisiblePopup] = React.useState(false); // туглю попап сортировки
    const sortRef = React.useRef();
    const activeLabel = items.find((obj) => obj.type === activeSortType).name;

    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup);
    };

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(sortRef.current)) {
            setVisiblePopup(false);
        }
    };

    const onSelectItem = (index) => {
        if (onClickSortType) {
            onClickSortType(index);
        }
        setVisiblePopup(false);
    };

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []); // [count] Перевыполнит эффект, только если count изменился

    return (
        <div ref={sortRef} className='sort'>
            <div className='sort__label'>
                <ReactSVG
                    src={IconArrowTop}
                    className={visiblePopup ? 'rotated' : ''}
                />

                <b>Сортировка по:</b>
                <span onClick={toggleVisiblePopup}>{activeLabel}</span>
            </div>
            {visiblePopup && (
                <div className='sort__popup'>
                    <ul>
                        {items &&
                            items.map((obj, index) => (
                                <li
                                    onClick={() => onSelectItem(obj)}
                                    className={
                                        activeSortType === obj.type
                                            ? 'active'
                                            : ''
                                    }
                                    key={`${obj.type}_${index}`}
                                >
                                    {obj.name}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default SortPopup;
