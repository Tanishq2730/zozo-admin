import { useState } from "react";

export default function Banner() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-3">Banner Master</h2>

        <label className="upload-box">
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          <div className="upload-content">
            <i className="bi bi-upload"></i>
            <span>Click to Upload</span>
          </div>
        </label>

        {image && (
          <div className="mt-3">
            <h5>Preview:</h5>
            <img src={image} alt="Preview" className="preview-img" />
          </div>
        )}

        <button className="btn btn-primary mt-3 w-100">Save Banner</button>
      </div>
    </div>
  );
}
