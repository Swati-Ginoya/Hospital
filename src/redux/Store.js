import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { RootReducer } from './reducer/RootReducer'
import { RootSaga } from './saga/RootSaga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
  key: 'root',
  storage,
  whitelist : ['auth']
}
const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, RootReducer)
const Middleware = [thunk,sagaMiddleware]

export const store = createStore(
  persistedReducer,
  applyMiddleware(...Middleware)
)

sagaMiddleware.run(RootSaga)
 export let persistor = persistStore(store)
