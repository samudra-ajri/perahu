import { 
    USER_ADD_EXTRA_SUBJECT_FAIL,
    USER_ADD_EXTRA_SUBJECT_REQUEST,
    USER_ADD_EXTRA_SUBJECT_RESET,
    USER_ADD_EXTRA_SUBJECT_SUCCESS,
    USER_ADD_SUBJECT_FAIL,
    USER_ADD_SUBJECT_REQUEST,
    USER_ADD_SUBJECT_RESET,
    USER_ADD_SUBJECT_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_TOP_FAIL,
    USER_TOP_REQUEST,
    USER_TOP_SUCCESS
} from "../constans/userConstans"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userSubjectAddReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_SUBJECT_REQUEST:
            return { loading: true }
        case USER_ADD_SUBJECT_SUCCESS:
            return { loading: false, success: true }
        case USER_ADD_SUBJECT_FAIL:
            return { loading: false, error: action.payload }
        case USER_ADD_SUBJECT_RESET:
            return {}
        default:
            return state
    }
}

export const userExtraSubjectAddReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADD_EXTRA_SUBJECT_REQUEST:
            return { loading: true }
        case USER_ADD_EXTRA_SUBJECT_SUCCESS:
            return { loading: false, success: true }
        case USER_ADD_EXTRA_SUBJECT_FAIL:
            return { loading: false, error: action.payload }
        case USER_ADD_EXTRA_SUBJECT_RESET:
            return {}
        default:
            return state
    }
}

export const userTopRankedReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_TOP_REQUEST:
            return { loading: true, users: [] }
        case USER_TOP_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_TOP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}