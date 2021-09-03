export const SET_DRAWER_INDEX = "SET_DRAWER_INDEX";

export function setDrawerItemIndex(index: number) {
  return {
    type: SET_DRAWER_INDEX,
    drawerItemIndex: index,
  };
}
