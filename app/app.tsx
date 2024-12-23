'use client'

import { useState, useRef } from "react";
import StickyHeader from "@/component/StickyHeader";

function Home() {

  const [modalVisible, setModalVisible] = useState(false);

  const bodyRef = useRef<HTMLDivElement | null>(null);

  const handleTap = () => {
      setModalVisible(true);
  };

  const handleTouch = () => {
      setModalVisible(true);
  };

  const closeWalletModal = () => {
    setModalVisible(false);
  };

  const [buttonWrapperRef, setButtonWrapperRef] = useState<React.RefObject<HTMLDivElement> | null>(null);

  const handleTonButtonClick = () => {
    if (buttonWrapperRef && buttonWrapperRef.current ) {
      const tonConnectButton = (buttonWrapperRef.current as any).querySelector(
        "button"
      ); // Adjust selector if necessary
      if (tonConnectButton) {
        tonConnectButton.click();
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[100vh] pt-[15%] pb-[100px] justify-between min-h-[590px]">
      {/* Display Number and Tap@Earn Context */}

      <div className="flex flex-col relative items-center justify-between">
        <h1 className="mb-4 max-sm:mb-1">MOONMOVERZ</h1>
        <div className="bg-white hidden">
          <StickyHeader setButtonRef={setButtonWrapperRef} />
        </div>
      </div>
      {/* Progress Bar and Limit */}
      <div>
        <p className="w-full text-2xl">
          Ready To Snag Some <br />{" "}
          <span className="font-extrabold text-[#f0dc2a]">$GMOON</span> Token?
        </p>
        {/* <div className="relative w-[340px] mt-6">
          <Link to='/boost' className="text-white flex flex-row items-center absolute right-4 bottom-[-20px]">
            <img src="/image/icon/boost_icon.svg" className="w-12 h-12" alt="Refs" />
            <span className="text-base mt-3">Boost</span>
          </Link>
        </div> */}
      </div>
      {/* Tap Go! Icon */}
      <div
        className="relative animate-zoomInOut mb-5 rounded-full bg-cover aspect-square h-[45vh] flex-shrink-0 items-center justify-center"
        ref={bodyRef}
        style={{ backgroundImage: "url('/image/move.jpg')" }}
        onTouchStart={handleTouch}
        onClick={handleTap}
      ></div>

      {/* Boost Button */}

      {/* Bottom Menu Button */}
      <div
        onClick={handleTonButtonClick}
        className="flex fixed justify-center items-center bottom-2 footer cursor-pointer w-[95%] h-[50px] bg-gradient-to-r from-[#f83b3b] to-[#f0dc2a] rounded-xl box-border px-4 active:scale-95 transition-all text-xl"
      >
        <img
          src="/image/icon/connect_wallet.svg"
          alt="tonbuttonicon"
          className="w-10 h-10"
        />
        Connect Wallet
      </div>

      {modalVisible && (
        <>
          <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg bg-[#1E3D4B] rounded-t-2xl flex flex-col justify-center gap-4 animate-slide-in-bottom transform transition-all max-h-[80vh] overflow-y-auto">
            <div className="flex justify-end w-full h-12">
              <button
                className="text-black bg-[#334349] p-1 rounded-full"
                onClick={closeWalletModal}
                style={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/image/icon/close_icon.svg"
                  alt="close"
                  className="w-4 h-4"
                />
              </button>
            </div>
            <p className="text-3xl font-bold text-center mb-2">
              Please connect the wallet first!
            </p>
            <div
              onClick={handleTonButtonClick}
              className="flex justify-center items-center bottom-2 footer cursor-pointer w-[95%] h-[50px] bg-gradient-to-r from-[#f83b3b] to-[#f0dc2a] rounded-xl box-border px-4 active:scale-95 transition-all text-xl"
            >
              <img
                src="/image/icon/connect_wallet.svg"
                alt="tonbuttonicon"
                className="w-10 h-10"
              />
              Connect Wallet
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default Home;
