import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { RootReducer } from './reducer/RootReducer'
import { RootSaga } from './saga/RootSaga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const sagaMiddleware = createSagaMiddleware()

const Middleware = [thunk,sagaMiddleware]

export const store = createStore(
    RootReducer,
  applyMiddleware(...Middleware)
)

sagaMiddleware.run(RootSaga)