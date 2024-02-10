import React from 'react';
import "./Login.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';

function Login() {
  return (
    <div>
      <form>
        <div className="segment">
          <h1>Sign up</h1>
        </div>

        <label><input type="text" placeholder="Email Address" /></label>
        <label><input type="password" placeholder="Password" /></label>
        <button className="red" type="button">
          Log in
        </button>

        <div className="segment">
          <button className="unit" type="button">
            <ArrowBackIosNewIcon />
          </button>
          <button className="unit" type="button">
            <BookmarkBorderIcon />
          </button>
          <button className="unit" type="button">
            <SettingsIcon />
          </button>
        </div>

        <div className="input-group">
          <label><input type="text" placeholder="Email Address" /></label>
          <button className="unit" type="button">
            <SearchIcon/>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
