import { SIDEBAR_SHOW } from "../constans/sidebarConstans"

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
