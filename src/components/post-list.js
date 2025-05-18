import React from "react";
import { Button, Spinner } from "@wordpress/components";
import Pagination from "./pagination";

const PostsList = ({
  posts,
  isLoading,
  currentPage,
  setCurrentPage,
  onSelectPost,
}) => {
  if (isLoading) {
    return (
      <div style={{ marginTop: "10px" }}>
        <Spinner />
      </div>
    );
  }

  if (!isLoading && (!posts || posts.length === 0)) {
    return <p style={{ marginTop: "10px" }}>Sorry, nothing found.</p>;
  }

  return (
    <div>
      <p>Results:</p>
      <div className="post-list">
        {(posts || []).map((post) => (
          <div key={post.id} className="post-list-item">
            <Button onClick={() => onSelectPost(post)} className="post-button">
              {post.title.rendered}
            </Button>
          </div>
        ))}
      </div>
      {posts.length > 1 && (
        <Pagination
          posts={posts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PostsList;
