import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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

  // useEffect(() => {
  //   const handlePopstate = () => {
  //     // Scroll to the previous position if available
  //     const prevScrollPosition = sessionStorage.getItem("prevScrollPosition");
  //     if (prevScrollPosition) {
  //       window.scrollTo(0, parseInt(prevScrollPosition));
  //     }
  //   };

  //   // Add event listener for browser back button or keyboard shortcut
  //   window.onpopstate = handlePopstate;

  //   return () => {
  //     // Cleanup event listener
  //     window.onpopstate = null;
  //   };
  // }, []);

  // const handleScroll = () => {
  //   // Store the current scroll position in session storage
  //   sessionStorage.setItem("prevScrollPosition", window.pageYOffset);
  // };

  console.log(shows);

  return (
    <div className="ShowList">
      <h2>TV Shows</h2>
      {shows.map((showItem) => (
        <div className="ShowItem" key={showItem.show.id}>
          <h3>{showItem.show.name}</h3>
          <img src={showItem.show.image.medium} alt={showItem.show.name} />
          <div>
            {/* {showItem.show.runtime && ( */}
            <div>
              <span>Runtime: </span>
              {showItem.show.runtime ? showItem.show.runtime : "N/A"}
            </div>
            {/* )} */}
            {/* {showItem.show.rating.average && ( */}
            <div>
              <span>rating: </span>
              {showItem.show.rating.average
                ? showItem.show.rating.average
                : "N/A"}
            </div>
            {/* )} */}
          </div>
          <Link to={`/summary/${showItem.show.id}`}>
            <button className="ShowButton">View Summary</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ShowList;
