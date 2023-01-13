import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useCallback } from "react";

interface Post {
  id: number;
  title: string;
  author: string;
}

const Posts = () => {
  const pageNumberLimit: number = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<string>("");
  const [posts, setPosts] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [maxPageLimit, setMaxPageLimit] = useState<number>(4);
  const [minPageLimit, setMinPageLimit] = useState<number>(0);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:3001/posts?_page=${currentPage}&_limit=${pageNumberLimit}`
    );
    if (response) {
      setTotalCount(response.headers["x-total-count"] as string);
      setPosts(response.data);
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const onPageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber++);
  };

  const onPrevClick = (): void => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = (): void => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <h1>Posts List</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>
            {post.title} - {post.author}
          </li>
        ))}
      </ul>
      <div>
        {!loading ? (
          <Pagination
            currentPage={currentPage}
            maxPageLimit={maxPageLimit}
            minPageLimit={minPageLimit}
            totalPages={Math.ceil(parseInt(totalCount) / pageNumberLimit)}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            onPageChange={onPageChange}
          />
        ) : (
          <div> Loading posts... </div>
        )}
      </div>
    </>
  );
};

export default Posts;
