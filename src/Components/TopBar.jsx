import React, { useEffect } from 'react'
import '../css/Topbar.css'
import '../css/Modal.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BsPersonFill, BsHouse, BsBoxArrowInRight } from 'react-icons/bs'
import { FaUserEdit } from 'react-icons/fa'
import Modal from './ModalComponent'
const TopBar = () => {

  const handleLogOut = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
  }
  const isLogged = () => {
    return !!localStorage.getItem('token')
  }

  const [isOpen, setIsOpen] = useState(false)

  return (<div className='topBar'>
    <div className={'topbar-wrapper'}>
      <div className={'topbar-left'}>
        <span className={'orange'}> GROUPE </span> 8
      </div>
      <div className={'topbar-mid'}>
        <div className={'link-div'}>
          <Link to={'/'} className={'link'}>
            <BsHouse size={40}
            />
          </Link>
        </div>
        <div className={'link-div'}>

          <Link to={'/profile'} className={'link'}>
            <FaUserEdit size={40} />
          </Link>

        </div>


        {isLogged() ? <>
            <button
              className={'primaryBtn'}
              onClick={() => setIsOpen(true)}>
              Creer un post!
            </button>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
          </>
          :
          false
        }


      </div>
      <div className={'topbar-right'}>

        {isLogged() ?
          <Link to={'/login'} onClick={handleLogOut} className={'link'}>
            <button className={'logout-btn'}>
              <BsBoxArrowInRight size={36} color={'black'} />
            </button>
          </Link>
          :
          <Link to={'/login'} onClick={handleLogOut} className={'link'}>
            <button className={'login-btn'}>
              <BsPersonFill size={40} />
            </button>
          </Link>

        }

      </div>
    </div>
  </div>)
}
export default TopBar