import React from 'react'
import '../css/Modal.css'
import { RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'

const Modal = ({ setIsOpen }) => {

  const [postData, setPostData] = useState({
    email: localStorage.getItem('email'),
    title: '',
    description: '',
  })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setPostData({ ...postData, [name]: value })
  }

  const handleSubmit = async (e) => {
    setIsOpen(false)
    try {
      await fetch('https://unl87haa1i.execute-api.us-east-1.amazonaws.com/dev/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        },
      )
        .then(
          (response) => {
            if (!response.ok) {
              response.json().then((data) => {
                  window.alert(data)
                },
              )
            }
            return response.json()
          },
        )
        .then((data) => {
          console.log(data)
        })
    } catch (e) {
      console.log('Erreur lors de la requete : ', e)
    }
    console.log(postData)
  }

  return (
    <>
      <div className={'darkBG'} onClick={() => setIsOpen(false)} />
      <div className={'centered'}>
        <div className={'modal'}>
          <div className={'modalHeader'}>
            <h5 className={'heading'}>Creer un post</h5>
          </div>
          <button className={'closeBtn'} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={'modalContent'}>
            <form onSubmit={handleSubmit}>
              <input
                type={'text'}
                onChange={handleFormChange}
                value={postData.title}
                name={'title'}
                placeholder={'Entrer le titre de votre post'}
              />
              <textarea
                name={'description'}
                onChange={handleFormChange}
                value={postData.description}
                placeholder={'Enter une description de votre post'}
              />
              <button type={'submit'} className={'postBtn'} onClick={handleSubmit}>
                Poster !!
              </button>
            </form>

          </div>
          <div className='modalActions'>
            <div className='actionsContainer'>

              <button
                className='cancelBtn'
                onClick={() => setIsOpen(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
