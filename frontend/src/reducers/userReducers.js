import { 
    USER_ADD_EXTRA_SUBJECT_FAIL,
    USER_ADD_EXTRA_SUBJECT_REQUEST,
    USER_ADD_EXTRA_SUBJECT_RESET,
    USER_ADD_EXTRA_SUBJECT_SUCCESS,
    USER_ADD_SUBJECT_FAIL,
    USER_ADD_SUBJECT_REQUEST,
    USER_ADD_SUBJECT_RESET,
    USER_ADD_SUBJECT_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_RESET,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_TOP_FAIL,
    USER_TOP_REQUEST,
    USER_TOP_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_LIST_ACTIVEONLY_ON,
    USER_LIST_ACTIVEONLY_OFF
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

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { ...state, loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload, klp: action.klp }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return {}
        default:
            return state
    }
}

export const userListActiveOnlyReducer = (state = { activeOnly: true }, action) => {
    switch (action.type) {
        case USER_LIST_ACTIVEONLY_ON:
            return { activeOnly: true }
        case USER_LIST_ACTIVEONLY_OFF:
            return { activeOnly: false }
        default:
            return state
    }
}
  
export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case USER_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return { user: {} }
        default:
            return state
    }
}