import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ShowSummary.scss";

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

  console.log(show);

  return (
    <div className="ShowSummary">
      <h2>Show Summary</h2>
      {show.summary ? (
        <div dangerouslySetInnerHTML={{ __html: show.summary }} />
      ) : (
        <p>Sorry! No Summary is available for this show...</p>
      )}
      <Link to={`/booking/${id}`}>
        <button className="ShowButton">Book Movie Ticket</button>
      </Link>
    </div>
  );
}

export default ShowSummary;
