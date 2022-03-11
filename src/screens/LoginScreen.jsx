import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const LoginScreen = () => {
  const navigate = useNavigate();
  //create a live clock
  const [time, setTime] = useState(new Date().toLocaleTimeString());
 

  const { login, signInWithGoogle, user } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
      alert("Login Successful");

    } catch (err) {
      setError(err.message);
    }
  };
   useEffect(() => {
     if (user && user.uid) {
       navigate("/", { replace: true });
     }
     const timer = setInterval(() => {
       setTime(new Date().toLocaleTimeString());
     }, 1000);

     return () => clearInterval(timer);
   }, [navigate]);
   

  return (
    <Container>
      <Row>
        <div className="float-center">
          <Col md={12}>
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Login to M-weza Bank system
            </h2>
            <br />
            <h3
              style={{
                textAlign: "center",
              }}
            >
              {" "}
              {time}{" "}
            </h3>
          </Col>
          <Col md={12}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="p-5">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password </Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                  variant="primary"
                  type="Submit"
                >
                  Log In
                </Button>
                <div className="p-4 box mt-3 text-center">
                  Don't have an account?{" "}
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#ffff",
                    }}
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </Form>
          </Col>
        </div>
      </Row>
    </Container>
  );
};

export default LoginScreen;
