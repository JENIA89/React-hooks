import React, { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GithubContext } from "../context/github/githubContext";

export const Profile = ({ match }) => {
  const { getUser, getRepo, loading, user } = useContext(GithubContext);
  const urlName = match.params.name;

  useEffect(() => {
    getUser(urlName);
    getRepo(urlName);
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <p className="text-center">loading...</p>;
  }

  const {
    name,
    avatar_url,
    company,
    location,
    blog,
    login,
    html_url,
    followers,
    public_repos,
    public_gists,
    bio,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="btn btn-link">
        На главную
      </Link>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img src={avatar_url} style={{ width: "150px" }} alt={name} />
              <h1>{name}</h1>
              {location && <p>Location: {location}</p>}
            </div>
            <div className="col">
              {bio && (
                <Fragment>
                  <h3>
                    Position: <strong>{bio}</strong>
                  </h3>
                </Fragment>
              )}
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark"
              >
                Открыть профиль
              </a>
              <ul>
                {login && (
                  <li>
                    <strong>Username:</strong> {login}
                  </li>
                )}
                {company && (
                  <li>
                    <strong>Company:</strong> {company}
                  </li>
                )}
                {blog && (
                  <li>
                    <strong>Websate:</strong> {blog}
                  </li>
                )}
              </ul>
              <div className="badge badge-primary">Followers: {followers}</div>
              <div className="badge badge-info">
                Repositories: {public_repos}
              </div>
              <div className="badge badge-dark">Gists: {public_gists}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
