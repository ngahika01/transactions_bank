import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [balance, setBalance] = useState(0);
  const accounstRef = collection(db, "accounts");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [accounts, setAccounts] = useState([]);

  const auth = getAuth();
  useEffect(() => {
    const getUser = async () => {
      const user = auth.currentUser;
      const q = await query(accounstRef, where("user", "==", user.uid));
      const data = await getDocs(q);
      setAccounts(
        data.docs.map((doc) => ({
          ...doc.data(where("user", "==", user.uid)),
          id: doc.id,
        }))
      );

      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        setUser(user.uid);
        console.log(user.uid);
      }
    };
    getUser();
  }, [user]);
  console.log(accounts.length + " accounts");

  const navigate = useNavigate();
  const createAccount = async (e) => {
    e.preventDefault();
    setError("");
    // get number of accounts for user and limit to 5
    if (accounts.length >= 5) {
      setError("You can only have 5 accounts");
      alert("You can only have 5 accounts");
      return;
    }

    try {
      await addDoc(accounstRef, {
        name,
        number,
        balance: parseInt(balance),
        user: user,
      });
      setName("");
      setNumber("");
      setBalance(0);
      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
      <h3
        style={{
          textAlign: "center",
        }}
      >
        Create Account
      </h3>
      {error && <Alert variant="danger">{error && error}</Alert>}
      <Row>
        <Col md={12}>
          <Form onSubmit={createAccount}>
            <Form.Group>
              <Form.Label>Account name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Account number</Form.Label>
              <Form.Control
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter account number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Balance</Form.Label>
              <Form.Control
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="Enter  balance"
              />
            </Form.Group>

            <br />
            <Button variant="primary" type="submit">
              Create account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccount;
