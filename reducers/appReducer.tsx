import { SET_DRAWER_INDEX } from "../actions/appAction";

const initialState = {
  drawerItemIndex: 0,
};

export function appReducer(
  state = initialState,
  action: { drawerItemIndex: number; type: string }
) {
  switch (action.type) {
    case SET_DRAWER_INDEX:
      return {
        ...state,
        drawerItemIndex: action.drawerItemIndex,
      };

    default:
      return state;
  }
}
