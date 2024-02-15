import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import FlexmonsterTable from '../Flexmonster/Flexmonster';
function Home() {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate('/settings'); // Use the path to your settings page
  };
  return (
    <div>
      <h1>Home</h1>
      <p>Here's your Home Page</p>
      <FlexmonsterTable
/>
      <div className="segment">
          <button className="unit" type="button">
            <ArrowBackIosNewIcon />
          </button>
          <button className="unit" type="button">
            <BookmarkBorderIcon />
          </button>
          
          <button onClick={goToSettings} className="unit" type="button">
            <SettingsIcon />
          </button>
         
        </div>
    </div>
  );
}

export default Home;