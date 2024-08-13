import React from "react";

const DisplayFullImage = ({ image }) => {
  return (
    <div className="relative top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
        <img src={image} className="w-full h-full" />
      </div>
    </div>
  );
};

export default DisplayFullImage;
