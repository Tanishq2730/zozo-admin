import { useState } from "react";
import { Trash2 } from "lucide-react";

const Addproduct = () => {
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleFeaturedChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="container allcard mt-4 p-4 rounded">
        <h5>Basic Details</h5>
        <form>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Product Name*</label>
              <input type="text" className="form-control" placeholder="Product Name" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Short Name*</label>
              <input type="text" className="form-control" placeholder="Short Name" />
            </div>
            <div className="col-md-3">
              <label className="form-label">URL*</label>
              <input type="url" className="form-control" placeholder="https://example.com" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Product Category*</label>
              <select className="form-select">
                <option>--Select Category--</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Descriptions</label>
            <textarea className="form-control" rows="5" placeholder="Enter description..."></textarea>
          </div>
          
        </form>
      </div>

      <div className="container allcard mt-4 p-4 rounded">
        <h5>Images</h5>
        <div className="p-4 border rounded-lg w-full max-w-2xl mx-auto">
          <div className="row">
            {/* Featured Image */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="block font-medium">Product Image (Featured)*</label>
                <input type="file" accept="image/png, image/jpeg" onChange={handleFeaturedChange} className="mt-1 form-control" />
                {featuredImage && (
                  <div className="mt-2 position-relative d-inline-block">
                    <img src={featuredImage} alt="Featured" className="img-thumbnail w-100" />
                    <button
                      onClick={removeFeaturedImage}
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product Gallery */}
            <div className="col-md-6">
              <div>
                <label className="block font-medium">Product Gallery*</label>
                <input type="file" accept="image/png, image/jpeg" multiple onChange={handleGalleryChange} className="mt-1 form-control" />
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="position-relative d-inline-block m-2">
                      <img src={image} alt={`Gallery ${index}`} className="img-thumbnail w-100" style={{ maxWidth: "100px", height: "100px" }} />
                      <button
                        onClick={() => removeGalleryImage(index)}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <button type="submit" className="btn btn-primary my-3">Submit</button>
    </>
  );
};

export default Addproduct;
