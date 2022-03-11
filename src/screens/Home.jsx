import { async } from "@firebase/util";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const auth = getAuth();
  const [accounts, setAccounts] = React.useState([]);

  const navigate = useNavigate();
  const { user, logout } = useUserAuth();
  console.log(user);
  //get all accounts of currrent user
  const accountsRef = collection(db, "accounts");
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }

    const fetchData = async () => {
      const q = await query(accountsRef, where("user", "==", user.uid));
      const data = await getDocs(q);
      setAccounts(
        data.docs.map((doc) => ({
          ...doc.data(where("user", "==", user.uid)),
          id: doc.id,
        }))
      );
    };

    fetchData();
  }, [user, accountsRef]);

  const logoutUser = () => {
    logout();

    navigate("/login", { replace: true });
  };
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this account?This action is not advised."
      )
    ) {
      const accDoc = doc(db, `accounts`, id);

      await deleteDoc(accDoc);
      alert("Account deleted successfully");
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#264ECA",
        color: "white",
        height: "100vh",
      }}
    >
      <Row>
        <>
          <h5
            className="text-center mt-5 mb-5"
            style={{
              textAlign: "center",
            }}
          >
            M-weka bank account system You are logged in as {user && user.email}
          </h5>
        </>
        <Col md={4}>
          <h4 className="h2">Profile</h4>
          <Card
            style={{
              color: "black",
            }}
          >
            <Card.Body>
              <Card.Text as="p">Name: {user && user.email} </Card.Text>
              <Card.Text>
                Phone Number:{" "}
                {user && user.phoneNumber
                  ? user.phoneNumber
                  : "No phone number"}{" "}
              </Card.Text>
              <Card.Text>
                <Button onClick={() => navigate("/edit")} variant="primary">
                  Edit Profile
                </Button>
              </Card.Text>
              <Card.Text>
                <Button onClick={logoutUser} variant="danger">
                  Logout
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Row>
            <Col md={12}>
              <Card className="mt-3">
                <Button
                  className="w-25 m-4"
                  onClick={() => navigate("/create")}
                  variant="primary"
                >
                  Open a new Account
                </Button>
                <h5>My accounts</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Account Number</th>
                      <th>Account Name</th>
                      <th>Account Balance</th>
                      <th>Deposit</th>
                      <th>Withdraw</th>
                      <th> Delete account </th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts && accounts.length === 0 && (
                      <td>No accounts yet</td>
                    )}

                    {accounts.map((account, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{account.number}</td>
                        <td>{account.name}</td>
                        <td>Ksh {account.balance}</td>
                        <td>
                          <Button
                            onClick={() => navigate(`/deposit/${account.id}`)}
                            variant="primary"
                          >
                            Deposit
                          </Button>
                        </td>
                        <td>
                          <Button
                            onClick={() => navigate(`/withdraw/${account.id}`)}
                            variant="primary"
                          >
                            Withdraw
                          </Button>
                        </td>
                        <td>
                          <Button
                            onClick={() => handleDelete(account.id)}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
