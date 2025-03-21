import { useState } from "react";
import { Trash2 } from "lucide-react";

const Addproduct = () => {
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  // ✅ Handle Featured Image
  const handleFeaturedChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  // ✅ Handle Gallery Image
  const handleGalleryChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length) {
      const newImages = files.map((file) => URL.createObjectURL(file));
      setGalleryImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  // ✅ Remove Featured Image
  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  // ✅ Remove Gallery Image
  const removeGalleryImage = (index) => {
    setGalleryImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* ✅ Basic Details Section */}
      <div className="container allcard mt-4 p-4 rounded">
        <h5>Basic Details</h5>
        <form>
          <div className="row mb-3">
            {/* ✅ Product Name */}
            <div className="col-md-3">
              <label className="form-label">Product Name*</label>
              <input type="text" className="form-control" placeholder="Product Name" required />
            </div>
            
            {/* ✅ Short Name */}
            <div className="col-md-3">
              <label className="form-label">Short Name*</label>
              <input type="text" className="form-control" placeholder="Short Name" required />
            </div>

            {/* ✅ URL */}
            <div className="col-md-3">
              <label className="form-label">URL*</label>
              <input type="url" className="form-control" placeholder="https://example.com" required />
            </div>

            {/* ✅ Product Category */}
            <div className="col-md-3">
              <label className="form-label">Product Category*</label>
              <select className="form-select" required>
                <option value="">--Select Category--</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home-appliances">Home Appliances</option>
              </select>
            </div>
          </div>

          {/* ✅ Price & Discount Price */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Price*</label>
              <input type="number" className="form-control" placeholder="Enter Price" required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Discount Price</label>
              <input type="number" className="form-control" placeholder="Enter Discount Price" />
            </div>

            {/* ✅ SKU */}
            <div className="col-md-3">
              <label className="form-label">SKU*</label>
              <input type="text" className="form-control" placeholder="SKU" required />
            </div>

            {/* ✅ Stock Quantity */}
            <div className="col-md-3">
              <label className="form-label">Stock Quantity*</label>
              <input type="number" className="form-control" placeholder="Enter Stock Quantity" required />
            </div>
          </div>

          {/* ✅ Status */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Status*</label>
              <select className="form-select" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* ✅ Tags */}
            <div className="col-md-3">
              <label className="form-label">Tags</label>
              <input type="text" className="form-control" placeholder="Enter tags (comma separated)" />
            </div>
          </div>

          {/* ✅ Descriptions */}
          <div className="mb-3">
            <label className="form-label">Description*</label>
            <textarea className="form-control" rows={5} placeholder="Enter description..." required />
          </div>
        </form>
      </div>

      {/* ✅ Image Section */}
      <div className="container allcard mt-4 p-4 rounded">
        <h5>Images</h5>
        <div className="p-4 border rounded-lg w-full max-w-2xl mx-auto">
          <div className="row">
            {/* ✅ Featured Image */}
            <div className="col-md-6">
              <div className="mb-4">
                <label className="block font-medium">Product Image (Featured)*</label>
                <input type="file" accept="image/png, image/jpeg" onChange={handleFeaturedChange} className="form-control mt-1" required />
                {featuredImage && (
                  <div className="mt-2 position-relative">
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

            {/* ✅ Product Gallery */}
            <div className="col-md-6">
              <label className="block font-medium">Product Gallery*</label>
              <input type="file" accept="image/png, image/jpeg" multiple onChange={handleGalleryChange} className="form-control mt-1" />
              <div className="d-flex flex-wrap gap-2 mt-2">
                {galleryImages.map((image, index) => (
                  <div key={index} className="position-relative">
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

      {/* ✅ Submit Button */}
      <button type="submit" className="btn btn-info text-white my-3">
        Submit
      </button>
    </>
  );
};

export default Addproduct;
