import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/firebase";

const Depost = () => {
  //get acount from nav state
  const [amount, setAmount] = React.useState(0);
  const [error, setError] = React.useState("");
  const [account, setAccount] = React.useState({});

  const params = useParams();

  const accountsRef = doc(db, `accounts`, params.id);
  useEffect(() => {
    const getAccount = async () => {
      const data = await getDoc(accountsRef);
      setAccount(data.data());
    };
    getAccount();
  }, []);
  console.log(account);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount === 0) {
      setError("Amount is required");
      return;
    }
    try {
      await updateDoc(accountsRef, {
        balance: parseInt(account.balance) + parseInt(amount),
      });
      setAmount(0);
      setError("");
      alert("Deposted successfully");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2 className="mb-3">Service your account</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <Card
            style={{
              backgroundColor: "#264ECA",
            }}
            className="mt-3"
          >
            <Card.Body>
              <Card.Title>
                <p>
                  <p className="text-white">
                   Account Name: {account.name}
                    <br />
                   AccountNumber: <small>{account.number}</small>
                    <br />
                    AccountBalance: <small>{account.balance}</small>
                  </p>
                </p>
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Label className="text-white">Deposit amount</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    value={amount}
                    type="number"
                    placeholder="Enter amount to deposit"
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                  />
                </Form.Group>
                <br />
                <Button
                  variant=""
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Depost;
