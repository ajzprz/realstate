import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2">
        <form className="flex flex-col gap-8" action="">
          <div className="flex items-center gap-2">
            <label  className="font-semibold whitespace-nowrap">Search Term</label>
            <input
              className="boder rounded-lg p-3 w-full"
              type="text"
              name=""
              id=""
              placeholder="Search..."
            />
          </div>
          <div className="flex gap-7 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="sale" className="w-5" />
              <span> Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-7 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="parking" className="w-5" />
              <span>Parking Lot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select className="border rounded-lg p-3 " id="sort_order">
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="text-3xl font-semibold border-b p-3 mt-5 text-slate-700">
        <h1>Listing Results:</h1>
      </div>
    </div>
  );
}
