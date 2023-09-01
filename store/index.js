import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// Import Reducers
import cartReducer from "./cart";
import wishlistReducer from './wishlist';
import compareReducer from './compare';
import demoReducer from './demo';

const rootReducers = combineReducers({
    cartlist: cartReducer,
    wishlist: wishlistReducer,
    comparelist: compareReducer,
    demo: demoReducer,
});

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducers)
const sagaMiddleware = createSagaMiddleware();

export const makeStore = (context) => {
    const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.__persistor = persistStore(store);
    return store;
};

// export default makeStore;

export const wrapper = createWrapper(makeStore, { debug: true });