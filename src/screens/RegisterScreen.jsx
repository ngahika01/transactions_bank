import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { auth, db } from "../config/firebase";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);
  const { signUp } = useUserAuth();
  const usersCollection = collection(db, "users");

  let navigate = useNavigate();

  const user = getAuth().currentUser;
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (cred) {
        const userId = cred.user.uid;
        const userData = {
          email: email,
          isAdmin: isAdmin,
          createdAt: time,
        };
        await setDoc(doc(db,'users',userId), userData);
      }
    } catch (error) {
      setError(error.message);
      
    }
    

  };

  return (
    <>
      <Container>
        <Row>
          <div className="float-center p-5">
            <Col md={12}>
              <h2 className="mb-3 text-center">Sign up </h2>
              <h3 className="text-center mb-4"> {time} </h3>
            </Col>

            <Col md={12}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    placeholder="Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                    }}
                    type="Submit"
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
              <div className="p-4 box mt-3 text-center">
                Already have an account?{" "}
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#ffff",
                  }}
                  to="/login"
                >
                  Log In
                </Link>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RegisterScreen;
