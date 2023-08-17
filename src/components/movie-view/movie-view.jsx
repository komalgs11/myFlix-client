import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Card, Container, Button } from "react-bootstrap";


export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isFavorited = user.favoriteMovies.includes(movie._id)
    setIsFavorite(isFavorited);
  }, []);

  const addToFavorite = () => {
    fetch(`https://mymoviesflix-415489b92353.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
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
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  const removeFavorite = () => {
    fetch(`https://mymoviesflix-415489b92353.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
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
        setIsFavorite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  return (
    <Container>
      <Card className="mt-3 mb-6 bg-dark text-white">
        <div className="text-center">
          <Card.Img className="h-100 w-25" variant="top" src={movie.ImageURL} alt={movie.Title} />
        </div>
        <Card.Body>
          <Card.Title className="text-center text-uppercase">{movie.Title}</Card.Title>
          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <Card.Text>Description:: {movie.Description}</Card.Text>
            <Card.Text>Genre:: {movie.Genre.Name}</Card.Text>
            <Card.Text>Genre Discription:: {movie.Genre.Description}</Card.Text>
            <Card.Text>Director:: {movie.Director.Name}</Card.Text>
            <Card.Text>Director Bio:: {movie.Director.Bio}</Card.Text>
            <Card.Text>Director DOB:: {movie.Director.Born}</Card.Text>
          </div>
        </Card.Body>

        {!isFavorite ? (
          <Button onClick={addToFavorite}>Add to Favourite List</Button>
        ) : (
            <Button onClick={removeFavorite}>Remove from Favourite List</Button>
          )}

        <br />

        <Link to={`/`}>
          <Button>Back</Button>
        </Link>
      </Card>
    </Container>

  );
};

