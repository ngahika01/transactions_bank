import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { Button, Col, Container, NavbarBrand, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  const [adminUser, setAdminUser] = React.useState(null);
  const [accounts, setAccounts] = React.useState([]);

  const currentUser = getAuth().currentUser;
  console.log(currentUser);
  // compare current user with user and check whether is admin
  console.log(adminUser);
  useEffect(() => {
    if (getAuth() === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      const usersCollection = collection(db, "users");
      const data = await getDocs(usersCollection);

      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    //check current user if is admin
    if (users) {
      users.forEach((user) => {
        if (user.id === currentUser.uid && user.isAdmin === false) {
          navigate("/");
          // alert("You are not an admin");
        }
      });
    }

    fetchData();
  }, [navigate, currentUser, users]);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        const accountsCollection = collection(db, "accounts");
        const data = await getDocs(accountsCollection);
        setAccounts(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      };
      fetchData();
    }
  }, [currentUser]);
console.log(accounts);
  return (
    <Container>
      <Row>
        <h1 className="text-center mt- mb-5">Admin Page</h1>
        <></>
        <Col md={6}>
          <h2 className="text-center mt-5 mb-5">Users list</h2>
          <Button onClick={() => navigate("/")}>Go back</Button>

          <Row>
            <Col md={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "Admin" : "User"}</td>
                      <td>
                        <Button
                          //   onClick={() => handleDelete(user.id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <h2 className="text-center mt-5 mb-5">Accounts list</h2>
          <Row>
            <Col md={12}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Account Number</th>
                    <th>Account Name</th>
                    <th>Account Balance</th>
                    <th> Account owner </th>
                    <th> Delete account </th>
                  </tr>
                </thead>
                <tbody>
                  {accounts && accounts.length === 0 && (
                    <td>No accounts yet</td>
                  )}

                  {accounts &&
                    accounts.length > 0 &&
                    accounts.map((account, index) => (
                      <>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{account.number}</td>
                          <td>{account.name}</td>
                          <td>{account.balance}</td>
                          <td>
                            {account.user &&
                              account.user.email &&
                              account.user.email}
                          </td>

                          <td>
                            <Button
                              //   onClick={() => handleDelete(user.id)}
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
                <tr>
                  <NavbarBrand NavbarBrand variant="success" className="w-100">
                    Total Balance:{" "}
                    {accounts.reduce((acc, curr) => {
                      return acc + curr.balance;
                    }, 0)}
                  </NavbarBrand>
                </tr>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
