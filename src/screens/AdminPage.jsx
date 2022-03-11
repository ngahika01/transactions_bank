import { getAuth } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    if (getAuth() === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      const data = await getDocs();
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    fetchData();
  }, [navigate]);

  return (
    <Container>
      <Row>
        <h1>Admin Page</h1>
        <Col md={6}>
          <h2>Users list</h2>
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
              </Table>
            </Col>
          </Row>
        </Col>
        <Col md={6}></Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
