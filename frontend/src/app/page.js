"use client";

import Click from "@/components/click";

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import dynamic from "next/dynamic";

const SpinWheel = dynamic(() => import("@/components/wheel"), {
  ssr: false,
});

export default function Home() {
  const { user, signOut } = useAuth();
  const [coins, setCoins] = useState(null); // Initially set to null
  const [loading, setLoading] = useState(true); // Loading state

  const addTenCoins = () => {
    setCoins((prevCoins) => prevCoins + 10);
  };

  const handleWinValue = (value) => {
    setCoins((prevCoins) => {
      const newCoins = Number(prevCoins) + Number(value);
      return newCoins === 0 ? 0 : newCoins;
    });
  };

  const updateCoins = async (value) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URI}api/coins`,
        {
          id: user.id,
          coins: value,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCoins = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URI}api/coins`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCoins(response.data);
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.log(error);
    }
  };

  const error = () => {
    toast("Login Required", {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (user) {
      getCoins();
    }
  }, [user]);

  useEffect(() => {
    if (user && coins !== null) {
      updateCoins(coins);
    }
  }, [coins]);

  return (
    <main className="max-w-[96%] px-4 mx-auto">
      <div className="flex justify-between items-center bg-[#04073B] text-white shadow rounded-lg mt-8 p-4">
        <div>
          <span className="text-sm">
            {user ? "Welcome Back!" : "Earn Money Today!"}
          </span>
          <h1 className="text-4xl uppercase">{user?.username || "Signup"}</h1>
        </div>
        <div className="flex gap-4 sm:flex-row flex-col items-end">
          {!user && (
            <Click>
              <Link
                href={user ? "/withdraw" : "/sign-up"}
                className="px-4 py-2 bg-[#084599] rounded-lg text-sm"
              >
                <button className="uppercase italic font-bold">
                  {user ? "Withdraw" : "Signup Now"}
                </button>
              </Link>
            </Click>
          )}
          {user && (
            <Click>
              <button
                className="uppercase italic font-bold px-4 py-2 bg-[#084599] rounded-lg text-sm"
                onClick={signOut}
              >
                SignOut
              </button>
            </Click>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#04073B] text-white shadow rounded-lg mt-4 p-4">
        <div className="flex flex-col gap-1">
          <h2>{user ? "Total Balance" : "Login to check Balance"}</h2>
          {user && (
            <div className="flex gap-1 items-center">
              <Image src="/coin.png" width={30} height={50} alt="coin" />
              {user && (
                <span className={loading ? "text-sm" : "text-4xl"}>
                  {loading ? "Loading..." : coins}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          {!user && (
            <div className="flex gap-1 items-center">
              <Image src="/coin.png" width={30} height={50} alt="coin" />
              {user && (
                <span className={loading ? "text-sm" : "text-4xl"}>
                  {loading ? "Loading..." : coins}
                </span>
              )}
            </div>
          )}
          {user && (
            <Click>
              <Link
                href={user ? "/withdraw" : "/sign-up"}
                className="px-4 py-2 bg-[#084599] rounded-lg text-sm"
              >
                <button className="uppercase italic font-bold">
                  {user ? "Withdraw" : "Signup Now"}
                </button>
              </Link>
            </Click>
          )}
        </div>
      </div>

      <Click>
        <div
          className="flex flex-col gap-5 justify-between items-center bg-[#040542] text-white shadow rounded-lg mt-4 p-8 hover:scale-105 transition cursor-pointer"
          onClick={user ? addTenCoins : error}
        >
          <Image src="/coin.png" width={200} height={200} alt="coin" />
          <div className="uppercase italic">
            {user ? "Click me to earn 10 Coins" : "Login to earn Coins"}
          </div>
        </div>
      </Click>

      <SpinWheel loggedIn={!!user} winValue={(e) => handleWinValue(e)} />
    </main>
  );
}
