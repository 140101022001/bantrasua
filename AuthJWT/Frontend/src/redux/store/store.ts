import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import trasuaSlice from "../slice/trasuaSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist:['job', '_persist', 'trasua']
}

const rootReducer = combineReducers({ auth: authSlice, trasua: trasuaSlice})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

const persistor = persistStore(store)

export {persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch