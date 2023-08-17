import { useState, useEffect } from "react";
import { Button, Card, Col, Row, Modal, Form, CardGroup } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies, onLoggedOut }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthDate] = useState(user.BirthDate);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);


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
      setShowUpdateModal(true); // Show the update success modal
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
        <Card className="mt-3 mb-3 border-3">
          <Card.Body>
            <Card.Title className="text-capitalize fw-semibold">Profile Details</Card.Title>
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
          <Card className="mt-3 mb-3 border-3">
            <Card.Body>
              <Card.Title className="text-capitalize fw-semibold" >Update-Info</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label >Username:</Form.Label>
                  <Form.Control className="border-secondary"
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
                  <Form.Control className="border-secondary"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter Your Password"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control className="border-secondary"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter Your Email"
                  />
                </Form.Group>
                <Form.Group controlId="formBirthDate">
                  <Form.Label>Birthdate:</Form.Label>
                  <Form.Control className="border-secondary"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder="Enter Your Birthdate"
                  />
                </Form.Group>
                <Button className="mt-3 mb-3 btn-dark" variant="primary" type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card className=" mt-3 mb-3 border-3">
          <Card.Body>
            <Card.Title className="text-capitalize fw-semibold">Favourite Movies:</Card.Title>
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


    <Button className="btn-dark" variant="primary" onClick={handleShowModal}> Delete Account</Button>

    <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your details have been updated successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
          Close
          </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title >Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete your account?</Modal.Body>
      <Modal.Footer>
        <Button className="btn-dark" variant="primary" onClick={handleDeleteUser}>Yes</Button>
        <Button className="btn-dark" variant="secondary" onClick={handleCloseModal}>No</Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};
