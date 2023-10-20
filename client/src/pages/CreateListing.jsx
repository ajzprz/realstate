import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded"
            type="text"
            name=""
            id="name"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            className="border p-3 rounded"
            type="text"
            name=""
            id="description"
            placeholder="Description"
          />
          <input
            className="border p-3 rounded"
            type="text"
            name=""
            id="address"
            placeholder="Address"
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" name="" id="sale" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" name="" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" name="" id="parking" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" name="" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input className="w-5" type="checkbox" name="" id="offer" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className=" flex items-center gap-2">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                name=""
                id="bedroom"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                name=""
                id="bathroom"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className=" flex items-center gap-2">
              <input
                className="p-3 border rounded-lg border-gray-300"
                type="number"
                name=""
                id="discountedPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col text-center">
                <p>Discounted Price</p>
                <span className="text-xs">( $/ Month )</span>
              </div>
            </div>
            <div className=" flex items-center gap-2">
              <input
                className=" p-3 border rounded-lg bo rder-gray-300"
                type="number"
                name=""
                id="regularPrice"
                min="1"
                max="10"
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
              className="p-2 border rounded border-gray-300  w-full"
              type="file"
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 border rounded border-green-700 uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 rounded-lg text-white uppercase hover:shadow-lg disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
