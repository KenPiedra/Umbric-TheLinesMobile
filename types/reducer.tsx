export type IAppReducer = {
  drawerItemIndex: number;
};

export type IAuthReducer = {
  token: string | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isRegistered: boolean;
};

export type IReducer = {
  app: IAppReducer;
  auth: IAuthReducer;
};
