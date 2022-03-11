import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../config/firebase";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateEmail, updateProfile } from "firebase/auth";
import { async } from "@firebase/util";

const EditProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { signUp } = useUserAuth();

  let navigate = useNavigate();

  const auth = getAuth();
  useEffect(() => {
    const getUser = async () => {
      const user = auth.currentUser;
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        setEmail(user.email);
        console.log(user.email);

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateEmail(auth.currentUser, email);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <div className="float-center">
            <Col md={12}>
              <h2 className="mb-3">Edit profile</h2>
            </Col>

            <Col md={12}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    value={email}
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      marginBottom: 10,
                    }}
                    type="Submit"
                  >
                    Update profile
                  </Button>
                </div>
              </Form>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EditProfileScreen;
