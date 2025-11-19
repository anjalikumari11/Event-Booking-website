import React from 'react';
import Banner from '../components/Banner';
import EventsAtHome from '../components/EventsAtHome';
import WhatOurUserSay from '../components/WhatOurUserSay';
import ReadyToYourWebsite from '../components/ReadyToYourWebsite';
import Working from '../components/Working';
import Footer from '../components/Footer';
import Robot from '/Robot.gif';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faForward, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { chatWithAi } from '../service/service';

function Home() {
  const [openChat, setOpenChat] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const handleRobot = async () => {
    if (userInput.trim() === "") return;

    setMessages(prev => [...prev, { sender: "user", text: userInput }]);

    try {
      const res = await chatWithAi(userInput);
      const reply = res.data.reply;

      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      setUserInput("");

    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="body" style={{ background: "#f8f9fb" }}>

      {/* banner */}
      <div className="mb-4">
        <Banner />
      </div>

      {/* events at home */}
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="row g-4">

          <div className="col-12">
            <EventsAtHome />
          </div>

          <div className="col-12 col-lg-4">
            <div className="shadow-sm p-3 bg-white rounded-3 h-100">
              <WhatOurUserSay />
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="shadow-sm p-3 bg-white rounded-3 h-100">
              <ReadyToYourWebsite />
            </div>
          </div>

        </div>
      </div>

      {/* working */}
      <div className="container my-5" style={{ maxWidth: "1200px" }}>
        <div className="row align-items-center g-3">

          <div className="col-12">
            <div className="shadow-sm p-4 bg-white rounded-3 h-100">
              <Working />
            </div>
          </div>

        </div>
      </div>



      {/* chat */}
      {openChat ?
        <div className="chatbox shadow-lg border-0"
          style={{
            width: "32vw",
            height: "550px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#ffffff",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
            transition: "all 1.3s ease"

          }}
        >
          <div className="d-flex justify-content-between align-items-center px-3 py-2"
            style={{
              background: "#212529",
              color: "white",
              borderRadius: "20px 20px 0 0",
            }}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center fw-bold text-white"
                style={{
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#6c757d",
                  fontSize: "14px",
                }}
              >
                E
              </div>
              <h5 className="m-0">Event Bot</h5>
            </div>

            <div className="d-flex align-items-center gap-3">
              <FontAwesomeIcon
                icon={faRefresh}
                style={{ cursor: "pointer", fontSize: "18px" }}
              />
              <FontAwesomeIcon
                icon={faClose}
                style={{ cursor: "pointer", fontSize: "18px" }}
                onClick={() => setOpenChat(false)}
              />
            </div>
          </div>

          <div
            className="flex-grow-1 px-3 py-3"
            style={{
              overflowY: "auto",
              background: "#f5f6fa",
            }}
          >
            <div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-3 ${msg.sender === "user" ? "bg-primary text-white ms-auto" : "bg-white text-dark me-auto"}`}
                  style={{ maxWidth: "75%", width: "fit-content" }}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>

          <div
            className="d-flex align-items-center p-2"
            style={{
              borderTop: "1px solid #dee2e6",
              background: "#ffffff",
            }}
          >
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Type a message..."
              style={{
                borderRadius: "20px",
                padding: "10px 15px",
                fontSize: "14px",
              }}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="btn btn-dark ms-2 rounded-circle d-flex justify-content-center align-items-center"
              onClick={handleRobot}
              style={{
                height: "40px",
                width: "40px",
              }}
            >
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
        </div>
        :
        <div className="mb-2 d-flex justify-content-center align-items-center"
        >
          <div
            className="rounded-circle shadow-sm bg-white d-flex flex-column justify-content-center align-items-center"
            style={{
              width: "80px",
              height: "80px",
              cursor: "pointer",
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 9999,
            }}
            onClick={() => setOpenChat(true)}
          >
            <img
              src={Robot}
              height={40}
              alt="Robot"
              className="img-fluid rounded-circle"
            />
          </div>

        </div>
      }


      <Footer />
    </div>
  );
}

export default Home;

