import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost, savePost, updatePost } from "./redux/PostSlice";

const initialState = {
  title: "",
  description: "",
  imgUrl: "",
};

function App() {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.postStore);

  const refInput = useRef();

  const [formulario, setFormulario] = useState(initialState);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const actions = (e) => {
    e.preventDefault();
    isEdit ? dispatch(updatePost(formulario)) : dispatch(savePost(formulario));
    refInput.current.focus();
    cleanState();
  };

  const cleanState = () => {
    setFormulario(initialState);
    setIsEdit(false);
  };

  const clickUpdate = (post) => {
    setFormulario(post);
    setIsEdit(true);
  };
  return (
    <div className="container mt-5">
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={actions}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    ref={refInput}
                    type="text"
                    placeholder="Enter title"
                    autoFocus
                    name="title"
                    value={formulario.title}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    value={formulario.description}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>imgUrl</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter imgurl"
                    name="imgUrl"
                    value={formulario.imgUrl}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Group>

                <Button type="submit" variant={isEdit ? "warning" : "primary"}>
                  {isEdit ? "Update" : "Save"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          <Row>
            {post.map((post) => (
              <Col xs={12} md={6} key={post._id}>
                <Card>
                  <Card.Img variant="top" src={post.imgUrl} />

                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <div className="justify-content-between">
                      <Button
                        variant="danger"
                        className="me-5"
                        onClick={() => dispatch(deletePost(post._id))}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => clickUpdate(post)}
                      >
                        Update
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
