import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();
  // console.log(formData);
  // console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false)
        return dispatch(updateUserFailure(error.message));
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  // firebase image storage rule
  //   allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*');

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          type="file"
          accept="image/*"
          ref={fileRef}
          name=""
          id="profilepic"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24  object-cover cursor-pointer self-center"
          src={formData.avatar || currentUser.avatar}
          alt=""
        />
        <p className=" text-sm text-center text-red-500">
          {fileUploadError ? (
            <span className="text-red-500">
              Error Image Upload, Image less than 2MB only
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-green-700">
              {" "}
              {`Uploading ${filePercentage} %`}{" "}
            </span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image sucessfully uploaded!</span>
          ) : (
            " "
          )}
        </p>

        <input
          className="border p-3 rounded-lg"
          type="text"
          name=""
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg"
          type="email"
          name=""
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          name=""
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "...Loading" : "Update"}
        </button>

        <Link
          to={"/create-listing"}
          className="bg-green-700
        text-white p-3 rounded-lg uppercase text-center hover:opacity-90
        "
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer ">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer ">
          Sign Out
        </span>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-red-700 text-center">{error ? error : " "}</p>
        <p className="text-green-700 text-center">
          {updateSuccess ? " User is updated Successfully" : ""}
        </p>
        <button onClick={handleListing} className="text-green-700 w-full ">
          Show Listings
        </button>
        <p>{showListingError ? "Error showing listing" : ""}</p>
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4 ">
            <h1 className="text-center text-2xl font-semibold">
              Your Listings
            </h1>
            {userListings.map((listing) => (
              <div
                className=" p-3 bg-slate-50-50 flex flex-row shadow-sm justify-between items-center border rounded-lg gap-4"
                key={listing._id}
              >
                <div className="flex flex-row gap-8 items-center">
                  <Link to={`/listing/${listing._id}`}>
                    <img
                    
                      className="hover:scale-110 h-16 w-16 object-contain"
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                    />
                  </Link>

                  <Link to={`/listing/${listing._id}`}>
                    <p className="hover:underline">{listing.name}</p>
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditListing(listing._id)}
                    className="text-green-700 uppercase"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
