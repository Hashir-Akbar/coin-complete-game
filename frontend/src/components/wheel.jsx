"use client";
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import Click from "./click";
import classNames from "classnames";
import { Button, Modal } from "antd";
import toast, { Toaster } from "react-hot-toast";

const data = [
  {
    option: "0",
    style: { backgroundColor: "#d49001", textColor: "white", fontSize: 43 },
  },
  {
    option: "1000",
    style: { backgroundColor: "white", fontSize: 43, textColor: "black" },
  },
  {
    option: "20000",
    style: { backgroundColor: "yellow", fontSize: 38, textColor: "black" },
  },
  {
    option: "5000",
    style: { backgroundColor: "purple", fontSize: 38, textColor: "white" },
  },
  {
    option: "10000",
    style: { backgroundColor: "orange", fontSize: 38, textColor: "black" },
  },
  {
    option: "900",
    style: { backgroundColor: "green", fontSize: 38, textColor: "white" },
  },
  {
    option: "100",
    style: { backgroundColor: "brown", fontSize: 38, textColor: "white" },
  },
];

export default function SpinWheel({ winValue, loggedIn }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [modal2Open, setModal2Open] = useState(false);
  const [spinsLeft, setSpinsLeft] = useState(2);
  const [isCooldown, setIsCooldown] = useState(false);

  // Load spin data from localStorage on component mount
  useEffect(() => {
    const storedSpinsLeft = localStorage.getItem("spinsLeft");
    const cooldownEndTime = localStorage.getItem("cooldownEndTime");

    if (storedSpinsLeft !== null) {
      setSpinsLeft(parseInt(storedSpinsLeft, 10));
    }

    if (cooldownEndTime) {
      const remainingCooldown = new Date(cooldownEndTime) - new Date();
      if (remainingCooldown > 0) {
        setIsCooldown(true);
        setTimeout(() => {
          setSpinsLeft(2);
          setIsCooldown(false);
          localStorage.removeItem("cooldownEndTime");
        }, remainingCooldown);
      }
    }
  }, []);

  // Save spins left to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("spinsLeft", spinsLeft);
  }, [spinsLeft]);

  const notify = () => {
    toast("Congrats you won " + data[prizeNumber].option, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
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

  const handleSpinClick = () => {
    if (spinsLeft > 0 && !mustSpin && !isCooldown) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setSpinsLeft((prevSpins) => prevSpins - 1);

      if (spinsLeft === 1) {
        const cooldownTime = 60 * 60 * 1000; // 60 minutes
        const cooldownEnd = new Date(new Date().getTime() + cooldownTime);
        localStorage.setItem("cooldownEndTime", cooldownEnd.toISOString());
        setIsCooldown(true);

        setTimeout(() => {
          setSpinsLeft(2);
          setIsCooldown(false);
          localStorage.removeItem("cooldownEndTime");
        }, cooldownTime);
      }
    }
  };

  return (
    <>
      <Click>
        <div
          className="flex flex-col gap-5 justify-between items-center bg-[#040542] text-white shadow rounded-lg my-4 p-8 hover:scale-105 transition cursor-pointer relative wheel overflow-hidden"
          onClick={() => setModal2Open(true)}
        >
          <div>
            <h3 className="uppercase italic text-lg font-bold">
              {loggedIn ? "Spin and Win" : "Login to Spin"}
            </h3>
          </div>
        </div>
      </Click>

      <Modal
        title="Spin wheel and Try Your Luck"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <div className="flex justify-center items-center my-4 gap-4 flex-col">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor={["#ccc"]}
            outerBorderWidth={[4]}
            innerBorderColor={["#f2f2f2"]}
            radiusLineColor={["transparent"]}
            radiusLineWidth={[1]}
            textColors={["#f5f5f5"]}
            textDistance={55}
            fontSize={[10]}
            spinDuration={[0.8]}
            onStopSpinning={() => {
              setMustSpin(false);
              notify();
              winValue(data[prizeNumber].option);
            }}
          />

          <Click noTap={!mustSpin}>
            <button
              className={classNames(
                "bg-[#040542] text-white shadow rounded-lg px-4 py-2",
                {
                  "cursor-not-allowed":
                    mustSpin || isCooldown || spinsLeft === 0,
                }
              )}
              onClick={loggedIn ? handleSpinClick : error}
              disabled={mustSpin || isCooldown || spinsLeft === 0} // Disable the button when spinning, in cooldown, or no spins left
            >
              {loggedIn
                ? isCooldown
                  ? `Try again in 60 minutes`
                  : `SPIN (${spinsLeft} left)`
                : "Please Login to spin"}
            </button>
          </Click>
        </div>
      </Modal>
      <Toaster />
    </>
  );
}
