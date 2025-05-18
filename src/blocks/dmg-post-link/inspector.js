import React from "react";
import { useState, useEffect, useMemo } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import PostsList from '../../components/post-list';

// Formulaire de recherche avec input + bouton + gestion entrée
const SearchForm = ({ inputValue, setInputValue, onSearch }) => {
  const onInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch();
    }
  };

  return (
    <>
      <label htmlFor="dmg-post-search" className="screen-reader-text">
        Search Posts
      </label>
      <p id="dmg-post-search-help">
        Type your search and press Enter or click Search. If empty, showing the
        last posts by default
      </p>
      <div className="search-container">
        <TextControl
          id="dmg-post-search"
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={onInputKeyDown}
          placeholder="Search posts by title or ID"
          aria-describedby="dmg-post-search-help"
        />
        <Button
          size="small"
          variant="primary"
          onClick={onSearch}
          aria-label="Search posts"
          style={{ whiteSpace: "nowrap" }}
        >
          Search
        </Button>
      </div>
    </>
  );
};

// Composant principal dans InspectorControls
export const BlockInspector = ({ attributes, setAttributes }) => {
  const { postId } = attributes;

  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const isSearchTermId = useMemo(
    () => /^\d+$/.test(searchTerm.trim()),
    [searchTerm]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const query = useMemo(() => {
    if (isSearchTermId) {
      return {
        include: [parseInt(searchTerm, 10)],
        per_page: 10,
        page: currentPage,
      };
    }
    return {
      search: searchTerm,
      per_page: 10,
      page: currentPage,
    };
  }, [searchTerm, currentPage, isSearchTermId]);

  const { posts, isLoading } = useSelect(
    (select) => {
      const selector = select(coreDataStore);
      return {
        posts: selector.getEntityRecords("postType", "post", query),
        isLoading: selector.isResolving("getEntityRecords", [
          "postType",
          "post",
          query,
        ]),
      };
    },
    [query]
  );

  useEffect(() => {
    if (posts && posts.length > 0 && !postId) {
      const recentPost = posts[0];
      setAttributes({
        postId: recentPost.id,
        postTitle: recentPost.title.rendered,
        postPermalink: recentPost.link,
      });
    }
  }, [posts, postId, setAttributes]);

  const handlePostSelect = (post) => {
    setAttributes({
      postId: post.id,
      postTitle: post.title.rendered,
      postPermalink: post.link,
    });
  };

  const triggerSearch = () => {
    setSearchTerm(inputValue.trim());
  };

  return (
    <InspectorControls>
      <PanelBody title="Select a post" initialOpen={true}>
        <SearchForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearch={triggerSearch}
        />
        <PostsList
          posts={posts}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onSelectPost={handlePostSelect}
        />
      </PanelBody>
    </InspectorControls>
  );
};
