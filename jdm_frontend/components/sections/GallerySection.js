import React, { useState } from "react";

const GallerySection = ({
  items = [],
  selectedTitle,
  onTitleChange,
  isLoading = false,
  // fallbackImage = "/fallback-image.png",
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const showVerticalNav = items.length > 5;

  const selectedImages =
    items.find((item) => item.title === selectedTitle)?.images || [];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  if (items.length === 0 && !isLoading) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">
          No gallery images available at the moment.
        </h4>
      </div>
    );
  }

  if (showVerticalNav) {
    return (
      <div className="gallery-container">
        <ul className="gallery-nav">
          {items.map((item) => (
            <li
              key={item.title}
              className={selectedTitle === item.title ? "active" : ""}
            >
              <button onClick={() => onTitleChange(item.title)}>
                {item.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="gallery-content">
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <h3 className="wow fadeInUp color-theme" data-wow-delay=".2s">
                {selectedTitle}
              </h3>
              {selectedImages.length > 0 ? (
                <div className="image-grid">
                  {selectedImages.map((image, idx) => (
                    <div
                      key={`${image.src}-${idx}`}
                      className="grid-item w-full"
                    >
                      <div className="gallery-image center w-full">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="img-fluid"
                          style={{
                            maxHeight: "270px",
                            width: "100%",
                            objectFit: "cover",
                            height: "100%",
                            cursor: "pointer",
                          }}
                          loading="lazy"
                          onClick={() => handleImageClick(image)}
                          onError={(e) => {
                            // e.target.src = fallbackImage;
                          }}
                        />
                        <p>{image.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No images available.</p>
              )}
            </>
          )}
        </div>

        {/* Modal for Image Expansion */}
        {modalOpen && selectedImage && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="imageModalLabel"
            aria-hidden={!modalOpen}
            onClick={handleCloseModal}
          >
            <div
              className="modal-dialog modal-lg"
              role="document"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="imageModalLabel">
                    {selectedImage.caption}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxHeight: "70vh",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      // e.target.src = fallbackImage;
                    }}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {modalOpen && <div className="modal-backdrop fade show"></div>}
      </div>
    );
  }

  // Show all images if 5 or fewer items
  return (
    <div className="gallery-content">
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="image-grid">
          {items.flatMap((item) =>
            item.images.map((image, idx) => (
              <div
                key={`${item.title}-${image.src}-${idx}`}
                className="grid-item w-full"
              >
                <div className="gallery-image center w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="img-fluid"
                    style={{
                      maxHeight: "170px",
                      width: "100%",
                      objectFit: "cover",
                      height: "100%",
                      cursor: "pointer",
                      maxWidth: "280px",
                    }}
                    loading="lazy"
                    onClick={() => handleImageClick(image)}
                    onError={(e) => {
                      // e.target.src = fallbackImage;
                    }}
                  />
                  <p>{image.caption}</p>
                </div>
              </div>
            )),
          )}
        </div>
      )}

      {/* Modal for Image Expansion */}
      {modalOpen && selectedImage && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="imageModalLabel"
          aria-hidden={!modalOpen}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="imageModalLabel">
                  {selectedImage.caption}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    maxHeight: "60vh",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    // e.target.src = fallbackImage;
                  }}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default GallerySection;
