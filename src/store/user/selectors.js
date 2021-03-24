
import {createSelector} from "reselect";
import {AuthorizationStatus} from "../../constants";
import {NameSpace} from "../reducer";

export const userEmailSelector = (state) => state[NameSpace.USER].email;
export const userAvatarSelector = (state) => state[NameSpace.USER].avatar;
export const userAuthorizationStatusSelector = (state) => state[NameSpace.USER].authorizationStatus;
export const userIsLoadedSelector = (state) => state[NameSpace.USER].isLoaded;
export const isUserLoggedInSelector = createSelector(
  userAuthorizationStatusSelector,
  (authorizationStatus) => authorizationStatus === AuthorizationStatus.AUTH
);
