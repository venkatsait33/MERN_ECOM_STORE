import React, { useEffect, useState } from "react";
import image1 from "../asset/banner/img1.webp";
import image2 from "../asset/banner/img2.webp";
import image3 from "../asset/banner/img3.jpg";
import image4 from "../asset/banner/img4.jpg";
import image5 from "../asset/banner/img5.webp";

import image1Mobile from "../asset/banner/img1_mobile.jpg";
import image2Mobile from "../asset/banner/img2_mobile.webp";
import image3Mobile from "../asset/banner/img3_mobile.jpg";
import image4Mobile from "../asset/banner/img4_mobile.jpg";
import image5Mobile from "../asset/banner/img5_mobile.png";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container px-4 mx-auto rounded ">
      <div className="relative w-full h-56 md:h-72 bg-slate-200">
        <div className="absolute z-10 flex items-center w-full h-full">
          <div className="flex items-center justify-between w-full text-2xl ">
            <button
              onClick={preveImage}
              className="p-1 rounded-full shadow-md bg-base-100"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="p-1 rounded-full shadow-md bg-base-100"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/**desktop and tablet version */}
        <div className="flex w-full h-full overflow-hidden ">
          {desktopImages.map((imageURl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageURl}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURl} className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
