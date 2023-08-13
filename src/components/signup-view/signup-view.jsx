import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, CardGroup, Container, Col, Row } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      BirthDate: birthdate
    };
    fetch("https://mymoviesflix-415489b92353.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        alert("SignUp Successful");
        window.location.reload();
      } else {
        alert("SignUp failed");
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
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
    </Container>
  );
};
