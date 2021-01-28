import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    sidebarShowReducer 
} from './reducers/sidebarReducers'
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userSubjectAddReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
    sidebarShow: sidebarShowReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userSubjectAdd: userSubjectAddReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
