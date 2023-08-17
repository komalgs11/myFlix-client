import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://mymoviesflix-415489b92353.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card style={{ marginTop: 100, marginBottom: 100 }} className="bg-light-white fw-medium border-dark">
              <Card.Body>
                <Card.Title className=" text-center text-capitalize">
                  Welcome to MyFlix
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername" className="mt-3 mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control className="border-dark"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                      placeholder="Enter Your Name"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3 mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control className="border-dark"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter Your Password"
                    />
                  </Form.Group>
                  <Button className="btn-dark" variant="primary" type="submit">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
};