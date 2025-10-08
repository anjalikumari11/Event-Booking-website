import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AOS from 'aos';
import anjali from "/anjali.png";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-light">
      <Navbar />
      <section className="py-5 text-center bg-dark text-white" data-aos="fade-down">
        <div className="container">
          <h1 className="display-4 fw-bold" style={{ color: "orange" }}>About PartyPass</h1>
          <p className="lead">
            Making event booking simple, fast, and enjoyable for everyone!
          </p>
        </div>
      </section>

     
      <section className="py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-4 fw-bold text-center" style={{ color: "#c26a05ff" }}>Our Mission</h2>
          <p className="text-center fs-5">
            At PartyPass, our mission is to provide a seamless platform for discovering, planning, and booking events of all sizes. 
            Whether it’s a small meetup or a grand celebration, we make sure your experience is effortless and enjoyable.
          </p>
        </div>
      </section>

     
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 fw-bold text-center text-danger" data-aos="fade-up">What We Offer</h2>
          <div className="row text-center">
            {[
              { title: 'Easy Booking', color: 'text-success', desc: 'Book events in just a few clicks, anytime, anywhere.' },
              { title: 'Secure Payments', color: 'text-primary', desc: 'Multiple payment options with full security and convenience.' },
              { title: 'Real-Time Updates', color: 'text-warning', desc: 'Get instant notifications and reminders for your upcoming events.' },
            ].map((item, idx) => (
              <div className="col-md-4 mb-4" key={idx} data-aos="zoom-in" data-aos-delay={idx * 200}>
                <div className="card shadow-sm p-4 h-100 hover-card transition">
                  <h5 className={`fw-bold ${item.color}`}>{item.title}</h5>
                  <p className="text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="mb-4 fw-bold text-center" style={{ color: "orange" }}>Our Story</h2>
          <p className="text-center text-secondary fs-5">
            PartyPass was founded in 2024 with a simple idea: make event booking stress-free. 
            We realized that planning events could be complicated, so we built a platform that simplifies the process, saves time, and brings people together for memorable experiences.
          </p>
        </div>
      </section>

     
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 fw-bold text-center text-danger" data-aos="fade-up">Meet the Team</h2>
          <div className="row text-center">
            {[
              { img: '/anjali.png', name: 'Anjali Kumari', role: 'Founder & CEO' },
              { img: '/logo.png', name: 'Neha Sharma', role: 'CTO' },
              { img: '/logo.png', name: 'Rohan Verma', role: 'Lead Designer' },
            ].map((member, idx) => (
              <div className="col-md-4 mb-4" key={idx} data-aos="fade-up" data-aos-delay={idx * 200}>
                <img src={member.img} alt={member.name} className="rounded-circle mb-2 team-img transition" width={150} height={150} />
                <h5 className="fw-bold">{member.name}</h5>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-5 text-center bg-dark text-white" data-aos="fade-up">
        <div className="container">
          <h3 className="mb-3 fw-bold" style={{ color: "orange" }}>Ready to Book Your Event?</h3>
          <p className="mb-4">Join thousands of users who trust PartyPass for their event planning!</p>
          <a href="/events" className="btn btn-lg text-light" style={{ background: "orange" }}>Explore Events</a>
        </div>
      </section>

      <Footer />

     
      <style jsx>{`
        .hover-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hover-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .team-img {
          transition: transform 0.3s;
        }
        .team-img:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

export default About;
