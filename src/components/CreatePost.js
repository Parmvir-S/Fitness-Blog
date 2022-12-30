import React from "react";
import { Form, Button } from "react-bootstrap";
import "../components/CreatePost.css";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";


function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const userPostsCollectionRef = collection(db, "userPosts");
  let navigate = useNavigate();


  const createPost = async () => {
    await addDoc(userPostsCollectionRef, {
      title,
      body,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [])


  return (
    <>
      <h1>Create A Blog Post</h1>
      <div className="postForm">
        <Form className="form">
          <Form.Group className="mb-3" id="postTitle">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Program Week 1 Day 1"
              onInput={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" id="post">
            <Form.Label>Post</Form.Label>
            <Form.Control
              className="textarea"
              as="textarea"
              rows={3}
              onInput={(e) => setBody(e.target.value)}
            />
          </Form.Group>

          <Button onClick={createPost} variant="info">Create Post</Button>
        </Form>
      </div>
    </>
  );
}

export default CreatePost;
