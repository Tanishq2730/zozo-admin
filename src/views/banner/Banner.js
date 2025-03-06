import { useState } from "react";
import DataTable from "react-data-table-component";

export default function Banner() {
  const [images, setImages] = useState([]);
  const [categoryLink, setCategoryLink] = useState("");
  const [banners, setBanners] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]); // Multi-upload support
  };

  const handleDeletePreviewImage = (image) => {
    setImages(images.filter((img) => img !== image)); // Remove only selected image
  };

  const handleSaveBanner = () => {
    if (images.length === 0 || !categoryLink) return;
    const newBanners = images.map((img) => ({ image: img, link: categoryLink }));
    setBanners([...banners, ...newBanners]);
    setImages([]);
    setCategoryLink("");
  };

  const handleDelete = (row) => {
    setBanners(banners.filter((banner) => banner.image !== row.image));
  };

  const columns = [
    {
      name: "Banner Image",
      selector: (row) => row.image,
      cell: (row) => (
        <img
          src={row.image}
          alt="Banner"
          width="100"
          height="50"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      name: "Category Link",
      selector: (row) => row.link,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-danger text-white"
          onClick={() => handleDelete(row)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container bannercard d-flex flex-column align-items-center my-4">
      <div className="card shadow-lg p-4 w-100">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-left mb-3">Banner Upload</h2>
            <label className="upload-box">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                hidden
              />
              <div className="upload-content">
                <i className="bi bi-upload"></i>
                <span>Click to Upload</span>
              </div>
            </label>
            <div className="mt-3">
              <label className="form-label">Add Category Link</label>
              <input
                type="text"
                className="form-control"
                value={categoryLink}
                onChange={(e) => setCategoryLink(e.target.value)}
                placeholder="Enter category link"
              />
            </div>
          </div>
          <div className="col-md-6">
            <h5 style={{ marginBottom: "1.5em" }}>Preview:</h5>
            {images.length > 0 && (
              <div className=" bannercard mt-3 d-flex flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="position-relative me-2 mb-2">
                    <img
                      src={image}
                      alt="Preview"
                      className="preview-img"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                        borderRadius: "5px",
                      }}
                    />
                    <button
                      className="btn imgpreivewcross btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => handleDeletePreviewImage(image)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-info text-white mt-3"
              onClick={handleSaveBanner}
            >
              Save Banner
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 w-100">
        <h3>Saved Banners</h3>
        <DataTable columns={columns} data={banners} pagination />
      </div>
    </div>
  );
}
