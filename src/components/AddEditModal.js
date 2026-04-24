import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createBlog, updateBlog } from "../features/blog/blogSlice";
import { toast } from "react-toastify";

const AddEditModal = ({ show, handleClose, editData }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        description: editData.description,
        location: editData.location,
        image: null,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("Title", form.title);
      formData.append("Description", form.description);
      formData.append("Location", form.location);

      if (form.image) {
        formData.append("Image", form.image);
      }

      if (editData) {
        await dispatch(
          updateBlog({ id: editData.id, data: formData }),
        ).unwrap();
        toast.success("Blog updated successfully!");
      } else {
        await dispatch(createBlog(formData)).unwrap();
        toast.success("Blog created successfully!");
      }

      handleClose();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? "Edit Blog" : "Add Blog"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
          </Form.Group>
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: "100%", marginTop: "10px", borderRadius: "10px" }}
            />
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleSubmit}>{editData ? "Update" : "Create"}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditModal;
