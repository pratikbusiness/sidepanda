import React from 'react'
import { MdNavigateNext } from 'react-icons/md'

function Footer() {
  return (
    <div className="footer">
        <p className="poweredby-text">POWERED BY APPOINTO</p>
        <button className="footer-next-button">
        <span className="footer-next-button-text">
            Next
        </span>
        <MdNavigateNext/>
        </button>
    </div>
  )
}

export default Footer