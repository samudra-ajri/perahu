import { SIDEBAR_FOCUS, SIDEBAR_SHOW } from "../constans/sidebarConstans"

export const sidebarShowReducer = (state = { sidebar: false }, action) => {
    switch (action.type) {
        case SIDEBAR_SHOW:
            return {
                sidebar: action.payload
            }
        default:
            return state
    }
}

export const sidebarFocusReducer = (state = { actve: '', open: '' }, action) => {
    switch (action.type) {
        case SIDEBAR_FOCUS:
            return {
                active: action.active,
                open: action.open
            }
        default:
            return state
    }
}
