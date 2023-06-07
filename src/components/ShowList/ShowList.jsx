import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import "./ShowList.scss";

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all/"
        );
        setShows(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShows();
  }, []);

  console.log(shows);

  return (
    <div className="Shows">
      <h2>TV Shows</h2>
      <div className="ShowList">
        {shows.map((showItem) => (
          <div className="ShowItem" key={showItem.show.id}>
            <h3>{showItem.show.name}</h3>
            <img src={showItem.show.image.medium} alt={showItem.show.name} />
            <div className="ShowsFrontAbout">
              <div>
                <span>Runtime: </span>
                {showItem.show.runtime ? `${showItem.show.runtime} min` : "N/A"}
                
              </div>
              <div>
                <span>rating: </span>
                {showItem.show.rating.average
                  ? showItem.show.rating.average
                  : "N/A"}
              </div>
            </div>
            <Link to={`/summary/${showItem.show.id}`} className="btn-section">
              <Button>View Detail</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;
