import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { removeUser } from 'model/user';
import './styles.scss';
import { Link } from 'react-router-dom';

const Navbar: FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const logout = () => dispatch(removeUser());

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__logoContainer">
          <Link to="/">
            <h3>Machine Max</h3>
          </Link>
        </div>
        {user && (
          <Button variant="contained" color="secondary" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
