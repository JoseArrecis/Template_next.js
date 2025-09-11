import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Marketing = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="menu">
      <div 
        className="menu-item" 
        onClick={() => setOpen(!open)} 
        style={{ cursor: 'pointer' }}
      >
        <i className="tabler-bullhorn"></i>
        <span>Marketing</span>
      </div>

      {open && (
        <ul className="submenu">
          <li>
            <Link to="/marketing/dashboard">
              <i className="tabler-chart-line"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/marketing/reports">
              <i className="tabler-report"></i> Reports
            </Link>
          </li>
          <li>
            <Link to="/marketing/settings">
              <i className="tabler-settings"></i> Settings
            </Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Marketing
