import { useState, useEffect } from "react";
import { Button, Card, Col, Row, Modal, Form, CardGroup } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies, onLoggedOut }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthDate] = useState(user.BirthDate);
  const [showModal, setShowModal] = useState(false);

  const favoriteMovies = movies.filter((movie) => {
    return user.favoriteMovies.includes(movie._id)
  });

  console.log(user.Username)

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  //function to handle user update
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
        Authorization: `Bearer ${token}`
      },
    }).then((response) => {
      if (response.ok) {
        onLoggedOut();
      } else {
        alert("something went wrong.")
      }
    });
  };

  return (<>
    <Row>
      <Col xs={12} sm={4} >
        <Card style={{ marginTop: 30, marginBottom: 20 }}>
          <Card.Body>
            <Card.Title className="text-capitalize text-decoration-underline">My Profile</Card.Title>
            <Card.Text >
              Username: {user.Username} <br />
                Email: {user.Email} <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={8} >
        <CardGroup>
          <Card style={{ marginTop: 20, marginBottom: 10 }}>
            <Card.Body>
              <Card.Title className="text-capitalize text-decoration-underline" >Update info</Card.Title>
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
                    placeholder="Enter Your Birthdate"
                  />
                </Form.Group>
                <Button style={{ marginTop: 10, marginBottom: 20 }} variant="primary" type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card style={{ marginTop: 10, marginBottom: 20 }}>
          <Card.Body>
            <Card.Title className="text-capitalize text-decoration-underline">Favourite Movies:</Card.Title>
            <div className="d-flex flex-wrap gap-4">
              {favoriteMovies.map((movie) => (
                <Col className="mb-4" key={movie._id} md={2}>
                  <MovieCard movie={movie}></MovieCard>
                </Col>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>


    <Button variant="primary" onClick={handleShowModal}> Delete Account</Button>

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title >Delete Account</Modal.Title>
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
