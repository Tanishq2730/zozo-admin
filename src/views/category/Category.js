import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

export default function Category() {
  const [thumbnail, setThumbnail] = useState(null);
  const [pageImage, setPageImage] = useState(null);

  const handleImageChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (setImage) => setImage(null);

  return (
    <div className="container my-4 maincard">
      <div className="row">
        {/* General Info */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h2 className="h5 mb-3">General Info</h2>
            <div className="mb-3">
              <label className="form-label">Name*</label>
              <input type="text" className="form-control" placeholder="Category Name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Slug*</label>
              <input type="text" className="form-control" placeholder="Category Slug" />
            </div>
            <div>
              <label className="form-label">Parent Category*</label>
              <select className="form-select">
                <option>--Select Parent Category--</option>
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h2 className="h5 mb-3">Images</h2>
            {[ 
              { label: 'Category Image (Thumbnail)*', image: thumbnail, setImage: setThumbnail },
              { label: 'Image for Category Page Title*', image: pageImage, setImage: setPageImage }
            ].map(({ label, image, setImage }, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">{label}</label>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="file"
                    className="d-none"
                    id={`fileInput${index}`}
                    onChange={(e) => handleImageChange(e, setImage)}
                  />
                  <label htmlFor={`fileInput${index}`} className="btn btn-primary">Browse</label>
                  {image && (
                    <div className="position-relative border rounded" style={{ width: '64px', height: '64px' }}>
                      <img src={image} alt="Preview" className="img-fluid rounded" />
                      <button
                        onClick={() => removeImage(setImage)}
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
