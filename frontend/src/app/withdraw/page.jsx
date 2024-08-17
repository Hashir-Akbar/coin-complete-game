"use client";
import Click from "@/components/click";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { ChevronLeft } from "lucide-react";
import WithdrawModal from "@/components/modal";
import { Input } from "antd";
import axios from "axios";

const Page = () => {
  const [coins, setCoins] = useState(null); // Initially set to null
  const [loading, setLoading] = useState(false); // Loading state

  const [paypal, setPaypal] = useState(8000);
  const [cashapp, setCashapp] = useState(5000);
  const [freefire, setFreefire] = useState(20000);
  const [monopoly, setMonopoly] = useState(30000);
  const [pubg, setPubg] = useState(40000);

  const getCoins = async () => {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URI}api/coins`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);
      setCoins(response.data);
      setLoading(false); // Set loading to false after fetching
    } catch (error) {
      console.log(error);
    }
  };

  const error = () => {
    toast("Not Enough Coins", {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const checkCoin = (item) => {
    if (coins < item) {
      error();
    }
  };

  const paypalClick = (
    <Click>
      <button
        onClick={() => checkCoin(paypal)}
        className="bg-[#084599] flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-white"
      >
        {paypal} <Image src="/coin.png" width={20} height={20} alt="coin" />
      </button>
    </Click>
  );

  const cashClick = (
    <Click>
      <button
        onClick={() => checkCoin(cashapp)}
        className="bg-[#084599] flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-white"
      >
        {cashapp} <Image src="/coin.png" width={20} height={20} alt="coin" />
      </button>
    </Click>
  );

  const freefireClick = (
    <Click>
      <button
        onClick={() => checkCoin(freefire)}
        className="bg-[#084599] flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-white"
      >
        {freefire} <Image src="/coin.png" width={20} height={20} alt="coin" />
      </button>
    </Click>
  );

  const monopolyClick = (
    <Click>
      <button
        onClick={() => checkCoin(monopoly)}
        className="bg-[#084599] flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-white"
      >
        {monopoly} <Image src="/coin.png" width={20} height={20} alt="coin" />
      </button>
    </Click>
  );

  const pubgClick = (
    <Click>
      <button
        onClick={() => checkCoin(pubg)}
        className="bg-[#084599] flex items-center gap-2 px-4 py-2 text-sm rounded-lg text-white"
      >
        {pubg} <Image src="/coin.png" width={20} height={20} alt="coin" />
      </button>
    </Click>
  );

  useEffect(() => {
    getCoins();
  }, []);
  return (
    <main className="max-w-[96%] px-4 mx-auto">
      <Link
        href={"/"}
        className="flex gap-1 items-center mt-8 text-white hover:underline text-sm"
      >
        <ChevronLeft /> Back To Home
      </Link>
      <div className="flex justify-between items-center bg-[#04073B] text-white shadow rounded-lg p-4 mt-4">
        <h2>History</h2>
        <div className="flex gap-1 items-center">
          <Image src="/coin.png" width={30} height={50} alt="coin" />
          <span className="text-4xl">0</span>
        </div>
      </div>
      <span className="w-full mt-8 inline-block h-1 bg-[#04073B]"></span>
      <div className="inline-block bg-[#04073B] text-white shadow rounded-lg mt-4 p-4">
        <h2 className="text-xl">Cash Withdrawal:</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 justify-between items-center bg-[#04073B] text-white shadow rounded-lg mt-8 p-4">
          <Image src={"/paypal.webp"} alt="paypal" width={300} height={300} />
          <h2 className="text-md">Paypal</h2>
          <span>100$</span>
          <WithdrawModal
            click={paypalClick}
            shouldModal={coins >= paypal}
            title={"Please Enter Your Paypal Email"}
          >
            <Input placeholder="Email" />
          </WithdrawModal>
        </div>
        <div className="flex flex-col gap-2 justify-between items-center bg-[#04073B] text-white shadow rounded-lg mt-8 p-4">
          <Image src={"/cashapp.png"} alt="cash app" width={300} height={300} />
          <h2 className="text-md">Cash App</h2>
          <span>100$</span>
          <WithdrawModal
            click={cashClick}
            shouldModal={coins >= cashapp}
            title={"Please Enter Your Cash Tag"}
          >
            <Input placeholder="Cash Tag" />
          </WithdrawModal>
        </div>
      </div>
      <div className="inline-block bg-[#04073B] text-white shadow rounded-lg mt-8 p-4">
        <h2 className="text-xl">Games Withdrawal:</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="flex flex-col pb-4 gap-3 items-center bg-[#04073B] text-white shadow rounded-lg mt-8">
          <Image
            className="max-h-32 sm:max-h-max object-cover"
            src={"/ff.jpg"}
            alt="free fire diamonds"
            width={500}
            height={10}
          />
          <h2 className="text-md">Free Fire</h2>
          <span>100 Diamonds</span>
          <WithdrawModal
            click={freefireClick}
            shouldModal={coins >= freefire}
            title={"Please Enter Your FreeFire game Tag"}
          >
            <Input placeholder="Tag" />
          </WithdrawModal>
        </div>
        <div className="flex flex-col pb-4 gap-3 items-center bg-[#04073B] text-white shadow rounded-lg mt-8">
          <Image
            src={"/uc.jpg"}
            className="max-h-32 sm:max-h-max object-cover"
            alt="PUBG UC"
            width={500}
            height={400}
          />
          <h2 className="text-md">PUBG</h2>
          <span>300 UC</span>
          <WithdrawModal
            click={pubgClick}
            shouldModal={coins >= pubg}
            title={"Please Enter Your Pubg game Tag"}
          >
            <Input placeholder="Tag" />
          </WithdrawModal>
        </div>
        <div className="flex flex-col pb-4 gap-3 items-center bg-[#04073B] text-white shadow rounded-lg mt-8">
          <Image
            src={"/images.jpg"}
            className="max-h-32 sm:max-h-max object-cover"
            alt="Monopoly Dice"
            width={500}
            height={400}
          />
          <h2 className="text-md">Monopoly Dice</h2>
          <span>900 Dice</span>
          <WithdrawModal
            click={monopolyClick}
            shouldModal={coins >= monopoly}
            title={"Please Enter Your Monopoly game Tag"}
          >
            <Input placeholder="Tag" />
          </WithdrawModal>
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
};

export default Page;
