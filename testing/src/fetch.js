import React, { useState, useEffect } from "react";
import axios from "axios";

export const AddMovies = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.title.value;
    console.log(name);
    setSearch(name);
  };

  useEffect(() => {
    const apiKey = `${process.env.REACT_APP_API_KEY}`;
    if (search === "") {
      return null;
    } else {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${search}`;
      axios.get(searchUrl).then((res) => {
        if (res.data.results.length !== 0) {
          console.log("searching");
          console.log(res.data.results);
          setResults(res.data.results);
        } else {
          console.log("error");
          setResults([]);
        }
      });
    }
  }, [search]);

  return (
    <div>
      <h1>Search Movie</h1>
      <div className="inputAdd">
        <form onSubmit={handleSubmit}>
          <input name="title" />
          <input type="submit" />
        </form>
      </div>
      {results.length > 0 ? (
        <ul className="results">
          {results.map((movie) => (
            <li>{movie.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AddMovies;
