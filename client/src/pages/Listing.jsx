import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setListing(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-3xl">Loading ...</p>}
      {error && <p className="text-3xl">Something Went Wrong</p>}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((imageUrl) => (
              <SwiperSlide key={imageUrl}>
                <div
                  className="h-[500px]"
                  style={{
                    background: `url(${imageUrl}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="  flex flex-col gap-4 max-w-4xl mx-auto p-3 my-7">
            <h1 className="text-3xl font-semibold">
              {listing &&
                listing.name + "- $" + listing.regularPrice + " " + "/ Month"}
            </h1>
            <p className="flex flex-row gap-2 items-center text-lg font-semibold">
              <FaMapMarkerAlt className="text-green-700" /> {listing.address}
            </p>

            <div className="flex flex-row gap-6">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-700">
              <span className="font-semibold text-black"> Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-row items-center gap-4 sm:gap-6">
              <li className="text-lg flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />{" "}
                {listing.bedroom > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </li>
              <li className="text-lg flex items-center gap-2 whitespace-nowrap">
                <FaBath className="text-lg" />{" "}
                {listing.bedroom > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </li>
              <li className="text-lg flex items-center gap-2 whitespace-nowrap">
                <FaParking className="text-lg" />{" "}
                {listing.parking ? "Parking Spot" : " No Parking"}
              </li>
              <li className="text-lg flex items-center gap-2 whitespace-nowrap">
                <FaChair className="text-lg" />{" "}
                {listing.furnished ? "Furnished " : " Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-80 p-3"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
