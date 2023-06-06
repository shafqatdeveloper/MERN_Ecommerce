import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CheckOutStep.css";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../Redux/Actions/cartAction.jsx";
import CheckoutStep from "../Components/CheckoutStep.jsx";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phone, setPhone] = useState(shippingInfo.phone);
  const shippingSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phone })
    );
    navigate("/order/confirm");
  };

  return (
    <div className="w-full h-[75vh]">
      <CheckoutStep activeStep={0} />
      <h1 className="text-xl font-semibold text-center my-5 text-gray-600">
        Shipping Details
      </h1>
      <div className=" flex  h-full justify-center">
        <div className="w-1/4 bg-yellow-100 h-4/5 py-5 ">
          <form
            onSubmit={shippingSubmit}
            className="flex flex-col gap-5 px-4 items-center"
            encType="multipart/form-data"
          >
            <div className="w-full">
              <input
                required
                className="border-2 w-full border-red-500 outline-none focus:outline-none bg-transparent rounded-md"
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="w-full">
              <input
                required
                className="border-2 w-full border-red-500 outline-none focus:outline-none bg-transparent rounded-md"
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="w-full">
              <input
                required
                className="border-2 w-full border-red-500 outline-none focus:outline-none bg-transparent rounded-md"
                type="number"
                placeholder="Enter Pin Code "
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                style={{
                  " webkitAppearance": "textfield",
                }}
              />
            </div>
            <div className="w-full">
              <input
                required
                className="border-2 w-full border-red-500 outline-none focus:outline-none bg-transparent rounded-md"
                type="number"
                placeholder="123-456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  " webkitAppearance": "textfield",
                }}
              />
            </div>
            <div className="w-full">
              <select
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full outline-none focus:outline-none"
                value={country}
                name="country"
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full">
              {country && (
                <select
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full  outline-none focus:outline-none"
                  value={state}
                  name="state"
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              )}
            </div>
            <div>
              <input
                className="bg-red-400 cursor-pointer px-2 py-1 text-white "
                type="submit"
                value="Continue"
                disabled={state ? false : true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
