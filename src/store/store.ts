import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productApi, { productReducer } from '../api/product';
import categoryApi, { categoryReducer } from '../api/category';
import authorApi, { authorReducer } from '../api/author';
// import { productReducer } from '../slices/Product';
// import { cartReducer } from '@/slices/Cart';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    [productApi.reducerPath]: productReducer,
    [categoryApi.reducerPath]: categoryReducer,
    [authorApi.reducerPath]: authorReducer

    // cart: cartReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([productApi.middleware, categoryApi.middleware, authorApi.middleware]),
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default persistStore(store)