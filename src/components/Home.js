import React from "react";
import { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button, Card } from "react-bootstrap";
import "./Home.css";

function Home({ isAuth }) {
  const [userPostList, setUserPostList] = useState([]);
  const userPostsCollectionRef = collection(db, "userPosts");

  useEffect(() => {
    const getUserPosts = async () => {
      const data = await getDocs(userPostsCollectionRef);
      setUserPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUserPosts();
  }, []);

  const deleteUserPost = async (id) => {
    const postDoc = doc(db, "userPosts", id);
    await deleteDoc(postDoc);
  };

  const renderPosts = (post, index) => {
    return (
      <Card
        style={{
          width: "55%",
          marginTop: "2%",
          marginBottom: "2%",
          padding: "2%",
          borderRadius: "20px",
          boxShadow: " 0 3px 3px rgba(0,0,0,0.2)"

        }}
        key={index}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "1.5em" }}>{post.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {post.author.name}
          </Card.Subtitle>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
        {isAuth && post.author.id === auth.currentUser.uid && (
          <Button
            onClick={() => {
              deleteUserPost(post.id);
            }}
          >
            Delete
          </Button>
        )}
      </Card>
    );
  };

  return <div className="homePage">{userPostList.map(renderPosts)}</div>;
}

export default Home;
