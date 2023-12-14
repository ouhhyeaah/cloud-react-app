import React, { useState } from 'react'
import '../css/Home.css'
import { BsPersonFill, BsFillFunnelFill } from 'react-icons/bs';
import FilterModalComponent from './FilterModalComponent'
import Modal from './ModalComponent'



const PostsHomePage = ({ posts }) => {

  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className={'main-container-css'}>
      <button
        className={'filter-button'}
        onClick={() => setIsOpen(true)}>
        Filtrer <BsFillFunnelFill/>
      </button>
      {isOpen && <FilterModalComponent setIsOpen={setIsOpen} />}
      <div className={'wrap-container'}>
        <div className={'posts-container'}>
          {posts.map((key) => (
              <div id={'post-container'} className={'post-container'}>
                <div className={'user-container'}>
                  <p>De <span className={'email'}> {key.email} </span></p>
                  <BsPersonFill size={24} />
                  <p> Créer le {key.createdAt.split('|')[0]} à {key.createdAt.split('|')[1]}</p>
                  <p id={"job"}>{key.job}</p>
                </div>
                <h2>{key.title}</h2>
                <p>{key.description}</p>

                <div className={'contact-link'}>
                  <a href={'mailto:' + key.email}>Contacter l'annonceur</a>
                </div>
              </div>
            ),
          )
          }
        </div>
      </div>
    </div>
  )
}
export default PostsHomePage