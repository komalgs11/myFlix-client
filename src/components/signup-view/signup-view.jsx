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
            <Card style={{ marginTop: 100, marginBottom: 50 }}>
              <Card.Body >
                <Card.Title className=" text-center text-capitalize" >Register Account</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group style={{ marginTop: 10, marginBottom: 10 }} controlId="formUsername">
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
                  <Form.Group style={{ marginTop: 10, marginBottom: 10 }} controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter Your Password"
                    />
                  </Form.Group>
                  <Form.Group style={{ marginTop: 10, marginBottom: 10 }} controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter Your Email"
                    />
                  </Form.Group>
                  <Form.Group style={{ marginTop: 10, marginBottom: 10 }} controlId="formBirthDate">
                    <Form.Label>Birthdate:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      required
                      placeholder="Enter Your Birthdate"
                    />
                  </Form.Group>
                  <Button style={{ marginTop: 20, marginBottom: 20 }} variant="primary" type="submit">Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
