import Axios from "axios";
import { useReducer } from "react";
import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from "../types";
import { GithubContext } from "./githubContext";
import { githubReducer } from "./githubReducer";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const withCreds = (url) => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
};

export const GithubState = ({ children }) => {
  const initState = {
    user: {},
    users: [],
    loading: false,
    repos: [],
  };
  const [state, dispatch] = useReducer(githubReducer, initState);

  const search = async (value) => {
    setLoading();

    const response = await Axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    );

    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items,
    });
  };

  const getUser = async (name) => {
    setLoading();

    const response = await Axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    );
    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };

  const getRepo = async (name) => {
    setLoading();
    const response = await Axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`)
    );
    dispatch({
      type: GET_REPOS,
      payload: response.data,
    });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  const { user, users, loading, repos } = state;

  return (
    <GithubContext.Provider
      value={{
        search,
        getUser,
        getRepo,
        clearUsers,
        setLoading,
        user,
        users,
        loading,
        repos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
