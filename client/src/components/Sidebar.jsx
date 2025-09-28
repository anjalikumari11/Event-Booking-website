import {
    faBraille,
    faBurger,
    faClock,
    faLocationArrow,
    faMoneyBill,
    faMusic,
    faSitemap,
    faTools,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Sidebar() {
    return (
        <div className='shadow-0 p-3 ' style={{ background: "#f4f3f3", borderRadius: "10px",height:"110vh" }}>
            <h4 className='mb-3 fw-bold' >Filters</h4>

            <div className='p-3 shadow-sm bg-white' style={{ borderRadius: "10px" }}>
                <ul className="list-unstyled m-0">
                    <li className='border-bottom p-2 mt-2 d-flex justify-content-left gap-1 text-secondary'>
                        <span><FontAwesomeIcon icon={faClock} style={{ fontSize: "15px" }} /></span>
                        <span>Date Range</span>
                    </li>
                    <li className='border-bottom d-flex  p-2 mt-2 d-flex justify-content-left gap-1 text-secondary'>
                        <span><FontAwesomeIcon icon={faMoneyBill} style={{ fontSize: "15px" }} /></span>
                        <span>Price</span>
                    </li>
                    <li className='border-bottom d-flex  p-2 mt-2 d-flex justify-content-left gap-1 text-secondary'>
                        <span><FontAwesomeIcon icon={faLocationArrow} style={{ fontSize: "15px" }} /></span>
                        <span>Location</span>
                    </li>
                    <li className='border-bottom d-flex  p-2 mt-2 d-flex justify-content-left gap-1 text-secondary'>
                        <span><FontAwesomeIcon icon={faSitemap} style={{ fontSize: "15px" }} /></span>
                        <span>Category</span>
                    </li>
                </ul>
            </div>

            <div className="mt-4">
                <h5 className='mb-3'>Browse by Category</h5>
                <div className='d-flex flex-wrap gap-3 mb-3'>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faMusic} className='border border-danger p-2' style={{borderRadius:"50%"}} />
                        <h6 className="mt-2 text-secondary">Music</h6>
                    </div>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faBurger} className='border p-2' style={{borderRadius:"50%"}} />
                        <h6 className="mt-2 text-secondary">Food</h6>
                    </div>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faTools} className='border p-2' style={{borderRadius:"50%"}} />
                        <h6 className="mt-2 text-secondary">Tools</h6>
                    </div>
                    <div className="text-center">
                        <FontAwesomeIcon icon={faBraille} className='border p-2' style={{borderRadius:"50%"}} />
                        <h6 className="mt-2 text-secondary">Art</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
