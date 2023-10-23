import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError(
            "Image Upload Failed (size should be max 2MB per image)"
          );
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload only 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress : ${progress}`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i != index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image.");
      if (+formData.discountPrice > +formData.regularPrice)
        return setError("Discount price must be lower than regular price !");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.name}
            type="text"
            name=""
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="5"
            required
          />
          <textarea
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.description}
            type="text"
            name=""
            id="description"
            placeholder="Description"
          />
          <input
            className="border p-3 rounded"
            onChange={handleChange}
            value={formData.address}
            type="text"
            name=""
            id="address"
            placeholder="Address"
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "sale"}
                className="w-5"
                type="checkbox"
                name=""
                id="sale"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "rent"}
                className="w-5"
                type="checkbox"
                name=""
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                value={formData.parking}
                className="w-5"
                type="checkbox"
                name=""
                id="parking"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                value={formData.furnished}
                className="w-5"
                type="checkbox"
                name=""
                id="furnished"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                value={formData.offer}
                className="w-5"
                type="checkbox"
                name=""
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className=" flex items-center gap-2">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                name=""
                id="bedrooms"
                min="1"
                max="100"
                onChange={handleChange}
                value={formData.bedrooms}
                required
              />
              <p>Beds</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                name=""
                id="bathrooms"
                min="1"
                max="100"
                onChange={handleChange}
                value={formData.bathrooms}
                required
              />
              <p>Baths</p>
            </div>
            {formData.offer && (
              <div className=" flex items-center gap-2">
                <input
                  className="p-3 border rounded-lg border-gray-300"
                  onChange={handleChange}
                  value={formData.discountedPrice}
                  type="number"
                  name=""
                  id="discountedPrice"
                  min="0"
                  max="10000"
                  required
                />
                <div className="flex flex-col text-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">( $/ Month )</span>
                </div>
              </div>
            )}
            <div className=" flex items-center gap-2">
              <input
                className=" p-3 border rounded-lg bo rder-gray-300"
                onChange={handleChange}
                value={formData.regularPrice}
                type="number"
                name=""
                id="regularPrice"
                min="1"
                max="10000"
                required
              />
              <div className="flex flex-col text-center">
                <p>Regular Price</p>
                <span className="text-xs">( $/ Month )</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-700 ml-2 ">
              The first image will be the cover image (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-2 border rounded border-gray-300  w-full"
              type="file"
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              disabled={uploading}
              className="p-3 border rounded border-green-700 uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "...Uploading" : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  onChange={handleImageSubmit}
                  src={url}
                  alt="listing-image"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:shadow-lg disabled:opacity-80"
          >
            {loading ? "Updating ... " : "Update Listing"}
          </button>
          {error && <p className="text-red-700 ">{error}</p>}
        </div>
      </form>
    </main>
  );
}
