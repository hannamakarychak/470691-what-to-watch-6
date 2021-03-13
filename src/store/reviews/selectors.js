import {NameSpace} from "../reducer";

export const reviewsSelector = (state) => state[NameSpace.REVIEWS].list;
export const reviewsLoadedSelector = (state) => state[NameSpace.REVIEWS].isLoaded;
