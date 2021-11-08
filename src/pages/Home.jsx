import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Categories,
    SortPopup,
    BurgerBlock,
    BurgerLoadingBlock,
} from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchBurgers } from '../redux/actions/burgers';

const categoryNames = [
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
];
const sortIems = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавит', type: 'name', order: 'asc' },
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ burgers }) => burgers.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ burgers }) => burgers.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    React.useEffect(() => {
        dispatch(fetchBurgers(sortBy, category));
    }, [category, sortBy]);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddBurgerToCart = (obj) => {
        dispatch({
            type: 'ADD_BURGER_CART',
            payload: obj,
        });
    };

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />

                <SortPopup
                    activeSortType={sortBy.type}
                    items={sortIems}
                    onClickSortType={onSelectSortType}
                />
            </div>

            <h2 className='content__title'>В наличии:</h2>

            <div className='content__items'>
                {isLoaded
                    ? items.map((obj) => (
                          <BurgerBlock
                              onClickAddBurger={handleAddBurgerToCart}
                              key={obj.id}
                              addedCount={
                                  cartItems[obj.id] &&
                                  cartItems[obj.id].items.length
                              }
                              {...obj}
                          />
                      ))
                    : Array(12)
                          .fill(0)
                          .map((_, index) => (
                              <BurgerLoadingBlock key={index} />
                          ))}
            </div>
        </div>
    );
}

export default Home;
