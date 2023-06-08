import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ShowSummary.scss";
import Button from "../../Button/Button";

function ShowSummary({ onQuery }) {
  const { id } = useParams();
  const [show, setShow] = useState([]);

  useEffect(() => {
    const fetchShowSummary = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/search/shows?q=all/`
        );
        const showItem = response.data.find(
          (item) => item.show.id === parseInt(id)
        );
        if (showItem) {
          setShow(showItem.show);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowSummary();
  }, [id]);

  // useEffect(() => {
    onQuery(show);
  // }, []);

  console.log("show", show);

  const backgroundImageStyle = {
    backgroundImage:
      show.image && show.image.medium ? `url(${show.image.medium})` : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="ShowSummary">
      <div className="ShowImgSection" style={backgroundImageStyle}>
        <div className="ShowImg">
          {show.image && show.image.medium && (
            <img src={show.image.medium} alt={show.name} />
          )}
        </div>
        <div className="ShowContent">
          <h1>{show.name}</h1>
          {show.rating && show.rating.average && (
            <h4>
              <span>Rating: </span>
              {show.rating.average}
            </h4>
          )}
          <div>
            <h4>{show.language}</h4>
            <div className="ShowGenres">
              {show.genres &&
                show.genres.map((genre) => <span key={show.id} className="ShowGenres">{genre}</span>)}
            </div>
          </div>
          <div>
            <span>{show.runtime} min</span>
            <span> | </span>
            {show.network &&
              show.network.country &&
              show.network.country.name && (
                <span>{show.network.country.name}</span>
              )}
            <span> | </span>

            {show.schedule &&
              show.schedule.days &&
              show.schedule.days.map((day) => <span key={show.id}>{day}</span>)}
          </div>
          <Link to={`/booking/${id}`} className="ShowButton">
            <Button>Book Movie Ticket</Button>
          </Link>
        </div>
      </div>
      <div className="ShowAboutSection">
        <h2>About the Show</h2>
        {show.summary ? (
          <div dangerouslySetInnerHTML={{ __html: show.summary }} />
        ) : (
          <p>Sorry! No Summary is available for this show...</p>
        )}
      </div>
    </div>
  );
}

export default ShowSummary;
