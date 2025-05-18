import React from "react";
import { Button } from "@wordpress/components";

const Pagination = ({ posts, currentPage, setCurrentPage }) => {
  return (
    <div className="pagination">
      <Button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        Prev
      </Button>
      <span>Page {currentPage}</span>
      <Button
        disabled={posts.length < 10}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
