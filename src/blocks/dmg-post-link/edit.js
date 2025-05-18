import React from "react";
import { useBlockProps } from "@wordpress/block-editor";
import { BlockInspector } from "./inspector";
import "./edit-styles.scss";

const Edit = ({ attributes, setAttributes }) => {
  const { postTitle, postPermalink } = attributes;
  const blockProps = useBlockProps();

  return (
    <>
      <BlockInspector attributes={attributes} setAttributes={setAttributes} />
      <div className="editor-post-featured-image__preview" {...blockProps}>
        {postTitle && postPermalink && (
          <p className="dmg-read-more">
            Read More: 
            <a title="Read {postTitle}" href={postPermalink}>
              {postTitle}
            </a>
          </p>
        )}
      </div>
    </>
  );
};

export default Edit;
