import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Gallery.module.css';
import { testGallery } from './data';

export default function Support() {

  const [currentImage, setCurrentImage] = useState(0)
  const [gapValue, setGapValue] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  // const [position, setPosition] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const switchImage = useCallback((index) => {
    console.log(index);
    setCurrentImage(index);
  })

  const previewImagesWrapper = useRef(null);
  const previewImageButton = useRef(null);
  const nextSlideButton = useRef(null);

  useEffect(() => {
    if (previewImagesWrapper.current && previewImageButton.current) {
      const gapValue = getComputedStyle(previewImagesWrapper.current).gap;
      const imageWidth =getComputedStyle(previewImageButton.current).width;
      console.log(gapValue, imageWidth);
      setGapValue(gapValue);
      setImageWidth(imageWidth);
    }

    const scrollArea = previewImagesWrapper.current

    const horizontalScroll = (e) => {
      e.preventDefault();
      scrollArea.scrollLeft += e.deltaY;
    }

    const handleScroll = () => {

      const current = scrollArea.scrollLeft;
      const maxScroll =  scrollArea.scrollWidth - scrollArea.clientWidth;
      const showLeft = current > 0;
      const showRight = current < maxScroll - 1;
      setShowPrev(showLeft);
      setShowNext(showRight);

      // console.log({ current, maxScroll, showLeft, showRight });
    }

    scrollArea.addEventListener('wheel', horizontalScroll);
    scrollArea.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => scrollArea.removeEventListener('scroll', handleScroll);
  },[])

  const gapV = parseFloat(gapValue);
  const imageV = parseFloat(imageWidth);
  const scrollStep = gapV + imageV;

  const moveNext = () => {
    previewImagesWrapper.current.scrollLeft += scrollStep;
  }

  const movePrev = () => {
    previewImagesWrapper.current.scrollLeft -= scrollStep;
  }

  return (
    <div className={styles.gallery}>
      <h2 hidden>Поддержка</h2>
      <div className={styles.galleryWrapper}>
        {
        showPrev && <button className={styles.prevSlideButton} onClick={movePrev}>
            <img src="images/arrow.png" alt="prev arrow" />
          </button>
        }
        <div className={styles.mainImageWrapper}>
          <img src={testGallery[currentImage]} alt="main image" />
          {/* {
            testGallery.map((image, index) => (
              <img key={index} src={currentImage === index ? image : ''} alt="main image" />
            ))
          } */}
        </div>
        <div className={styles.previewImagesWrapper} ref={previewImagesWrapper}>
          {
            testGallery.map((image, index) => (
              <div className={styles.previewImageContainer}>
                <button key={index} 
                        type="button" 
                        className={styles.previewImageButton} 
                        onClick={() => switchImage(index)}
                        ref={previewImageButton}
                        >
                  <img src={image}/>
                </button>
              </div> 
          ))}
        </div>
        {
        showNext && <button className={styles.nextSlideButton} onClick={moveNext} ref={nextSlideButton}>
            <img src="images/arrow.png" alt="prev arrow" />
          </button>
        }
      </div>
    </div>
  )
}


