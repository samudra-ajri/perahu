import axios from 'axios'
import { 
  USER_ADD_SUBJECT_FAIL,
  USER_ADD_SUBJECT_REQUEST,
  USER_ADD_SUBJECT_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
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
} from '../constans/userConstans'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
        type: USER_LOGIN_REQUEST,
    })

    const config = {
        headers: {
        'Content-Type': 'application/json',
        },
    }

    const { data } = await axios.post('/api/users/login', { email, password }, config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/login'
}

export const register = (name, email, klp, dayBirth, monthBirth, yearBirth, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const user = {
      name, 
      email, 
      klp, 
      dayBirth, 
      monthBirth, 
      yearBirth, 
      password
    }

    const { data } = await axios.post('/api/users', user, config)

    dispatch({
      type: USER_REGISTER_SUCCESS
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}



export const addUserSubject = (userId, subject) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_SUBJECT_REQUEST,
    })

    const { userLogin: { userInfo }} = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/users/${userId}/subjects`, subject, config)

    dispatch({
      type: USER_ADD_SUBJECT_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_ADD_SUBJECT_FAIL,
      payload: message,
    })
  }
}

export const listUserRanked = () => async (dispatch) => {
  try {
    dispatch({ type: USER_TOP_REQUEST })

    const { data } = await axios.get(`/api/users/top`)

    dispatch({
      type: USER_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}