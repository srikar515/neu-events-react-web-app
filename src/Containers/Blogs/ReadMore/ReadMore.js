import React, { useState } from "react";
import './ReadMore.scss'

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  //Toggle Functionality is used for Read more text.
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  //HTML Representation of the Readmore under the Blogs Section
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

export default ReadMore;