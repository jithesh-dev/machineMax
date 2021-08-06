import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import TimelinePage from 'pages/Timeline';
import { loginUser } from 'model/user';
import AlbumDetailsPage from 'pages/AlbumDetails';

const App = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const localData = localStorage.getItem('user');

    if (localData) {
      const user = JSON.parse(localData);
      user && dispatch(loginUser(user));
    }
  }, []);

  return (
    <>
      <Router>
        {!user ? (
          <LoginPage />
        ) : (
          <Switch>
            <Route path="/albums/:albumId" children={<AlbumDetailsPage />} />
            <Route path="/">
              <TimelinePage />
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
};

export default App;
