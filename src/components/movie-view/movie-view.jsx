import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Card, Container, Button } from "react-bootstrap";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user.favouriteMovies && user.favouriteMovies.includes(movieId)) {
      setIsFavourite(true);
    }
  }, []);

  const addToFavourite = () => {
    fetch(`https://mymoviesflix-415489b92353.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
      .then((data) => {
        setIsFavourite(true);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));

      });
  }

  const removeFavourite = () => {
    fetch(`https://mymoviesflix-415489b92353.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
      .then((data) => {
        setIsFavourite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };
  return (
    <Container>
      <Card>
        <Card.Img variant="top" src={movie.ImageURL} alt={movie.Title} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Genre:: {movie.Genre.Name}</Card.Text>
          <Card.Text>Genre Discription:: {movie.Genre.Description}</Card.Text>
          <Card.Text>Director:: {movie.Director.Name}</Card.Text>
          <Card.Text>Director Bio:: {movie.Director.Bio}</Card.Text>
          <Card.Text>Director DOB:: {movie.Director.Born}</Card.Text>
          <Card.Text>Description:: {movie.Description}</Card.Text>
        </Card.Body>
        {!isFavourite ? (
          <Button onClick={addToFavourite}>Add to FavouriteList</Button>
        ) : (<Button onClick={removeFavourite}>Remove from FavouriteList</Button>)}

        <br />

        <Link to={`/`}>
          <Button>Back</Button>
        </Link>
      </Card>
    </Container>
  );
};

