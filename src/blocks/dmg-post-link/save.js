const Save = ({ attributes }) => {
    const { postPermalink, postTitle } = attributes;

    return (
        <p className="dmg-read-more">
            Read More: <a
                title={`Read ${postTitle}`}
                href={postPermalink}
                aria-label={`Read more about ${postTitle}`}
            >
                {postTitle}
            </a>
        </p>
    );    
};

export default Save;
