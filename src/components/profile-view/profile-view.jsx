import { useState } from "react";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";


export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthDate] = useState(user.BirthDate);
  const [showModal, setShowModal] = useState(false);
  const favourite_movies = movies.filter((movie) => user.favouriteMovies.includes(movie._id));

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      BirthDate: birthdate
    };

    fetch(`https://mymoviesflix-415489b92353.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("Update failed");
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const handleDeleteUser = () => {
    fetch(`https://mymoviesflix-415489b92353.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then((response) => {
      if (response.ok) {
        onLogout();
      } else {
        alert("something went wrong.")
      }
    });
  };

  return (<>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <Card.Text>
              Username: {user.Username} <br />
                Email: {user.Email} <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>upadet info</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                    placeholder="Enter Your Name"
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter Your Password"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter Your Email"
                  />
                </Form.Group>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Birthdate:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                    placeholder="Enter Your Birthdate"
                  />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Favorite Movies</Card.Title>
            {favourite_movies.map((movie) => (
              <MovieCard movie={movie}></MovieCard>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Button variant="primary" onClick={handleShowModal}> Deregister Account</Button>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title >Deregister</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete your account?</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
        <Button variant="secondary" onClick={handleCloseModal}>No</Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};
