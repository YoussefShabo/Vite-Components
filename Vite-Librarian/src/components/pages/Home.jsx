import React from "react";
import "./Home.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../tiptap/TiptapEditor";

function Home() {
  const navigate = useNavigate();

  const goToSettings = () => {
    navigate("/settings");
  };
  return (
    <div>
      <h1>Home</h1>
      <p>Here's your Home Page</p>
      <div className="tiptap">
        <TiptapEditor />
      </div>
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
