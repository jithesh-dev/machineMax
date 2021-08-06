import React, { SyntheticEvent, useState } from 'react';
import Layout from 'components/Layout';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';

import './styles.scss';
import { Button, FormControl, makeStyles, TextField } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { loginUser } from 'model/user';
import { API_SOURCE_URL } from 'common/constants';
import { removeUser } from '../../model/user';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (username !== '' && password !== '') {
      const url = `${API_SOURCE_URL}/users?${
        validateEmail(username) ? 'email' : 'username'
      }=${username}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { id, name, username, email } = data[0];
            dispatch(
              loginUser({
                id: id,
                name: name,
                username: username,
                email: email,
              })
            );
            setIsError(false);
          } else {
            setIsError(true);
            dispatch(removeUser());
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <Layout>
      <div className="login">
        <div className="login__box">
          <h3 className="textCenter">Login</h3>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                label="Username/Email"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {isError && (
              <div className="login__error">
                <ErrorIcon />
                Invalid credentials
              </div>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
