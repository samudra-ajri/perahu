import { SIDEBAR_SHOW } from "../constans/sidebarConstans"

export const showSidebar = (show) => async (dispatch) => {
    dispatch({
        type: SIDEBAR_SHOW,
        payload: show
    })
}