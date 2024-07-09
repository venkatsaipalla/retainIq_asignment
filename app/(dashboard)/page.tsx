"use client";
import Navbar from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";
import store, { persistor } from "../redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ProductCard from "./_components/ProductCard";
import FilterCardModel from "./_components/FilterCardModel";
import DesignCardModel from "./_components/DesignCardModel";
import { useState } from "react";

const Dashboard = () => {
  const [toggleRadio, setToggleRadio] = useState(true);
  const handleToggleRadio = (toggleRadio: Boolean) => {
    setToggleRadio(!toggleRadio);
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="h-full relative">
          <div className="hidden h-full md:w-52  md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-black">
            <div>
              <Sidebar />
            </div>
          </div>
          <main className="md:pl-52 space-y-2">
            <Navbar />

            <div className="flex justify-between p-4">
              <h1 className="text-xl font-semibold">Rules creation</h1>
              <button className="bg-green-500 p-2 rounded text-white hover:bg-green-700">
                Publish Feed
              </button>
            </div>
            <div className="flex min-w-screen relative">
              <ProductCard />
              <DesignCardModel />
              <FilterCardModel />
            </div>
            <div className="min-w-screen p-5 bg-#f9fafb-500">
              <label className="inline-flex items-center cursor-pointer">
                <span className="ms-3 text-lg font-bold text-gray-900 dark:text-gray-300 px-2">
                  Use different design for remaining SKU&apos;s
                </span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={toggleRadio}
                  onClick={() => setToggleRadio(!toggleRadio)}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </main>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default Dashboard;
