import { SIDEBAR_SHOW, SIDEBAR_FOCUS } from "../constans/sidebarConstans"

export const showSidebar = (show) => async (dispatch) => {
    dispatch({
        type: SIDEBAR_SHOW,
        payload: show
    })
}

export const focusSidebar = (active, open) => async (dispatch) => {
    dispatch({
        type: SIDEBAR_FOCUS,
        active,
        open
    })
}