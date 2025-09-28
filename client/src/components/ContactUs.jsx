
import React from 'react'

function ContactUs() {
    return (
        <div className='shadow p-4 ' style={{ background: "#f4f3f3", borderRadius: "10px" }}>
            <h3 className='mb-3 fw-bold' >Get In Touch</h3>
            <div className='mb-2'>
                <label className='form-label'>Full Name</label>
                <input type='text' className='form-control' />
            </div>
            <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your message here"
                ></textarea>
            </div>
            <div>
                <button className='btn text-light fw-bold' style={{background:"orange",borderRadius:"50px"}}>Send Message</button>
            </div>
            <p className='text-secondary'>Our aim is to respond you within 24 hours</p>
        </div>
    )
}

export default ContactUs
