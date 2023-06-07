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

  onQuery(show);

  console.log("show", show);

  return (
    <div className="ShowSummary">
      <div>
        {show.image && show.image.medium && (
          <img src={show.image.medium} alt={show.name} />
        )}
        <div>
          <h1>{show.name}</h1>
          {show.rating && show.rating.average && <h5>{show.rating.average}</h5>}

          <div>
            <div>
              <span>{show.language}</span>
            </div>
            <div>
              {show.schedule &&
                show.schedule.days &&
                show.schedule.days.map((day) => <span>{day}</span>)}
            </div>
          </div>
        </div>
      </div>
      <h2>About the Show</h2>
      {show.summary ? (
        <div dangerouslySetInnerHTML={{ __html: show.summary }} />
      ) : (
        <p>Sorry! No Summary is available for this show...</p>
      )}
      <Link to={`/booking/${id}`}>
        <Button>Book Movie Ticket</Button>
        {/* <button className="ShowButton">Book Movie Ticket</button> */}
      </Link>
    </div>
  );
}

export default ShowSummary;
