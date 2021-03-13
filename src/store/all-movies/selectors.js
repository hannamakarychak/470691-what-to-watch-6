import {NameSpace} from "../reducer";

export const getList = (state) => state[NameSpace.ALL_MOVIES].list;
export const getGenre = (state) => state[NameSpace.ALL_MOVIES].genre;
export const getLoadedStatus = (state) => state[NameSpace.ALL_MOVIES].isLoaded;
