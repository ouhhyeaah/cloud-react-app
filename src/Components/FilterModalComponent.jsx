import React from 'react'
import '../css/Modal.css'
import { RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'

const FilterModalComponent = ({ setIsOpen }) => {

  const handleChange = (e) => {
    const {name, value} = e.target
    const posts = document.querySelectorAll('div.post-container')
    posts.forEach(function(post) {
      const jobPart = post.querySelector('#job').innerText;

      if (jobPart === value) post.style.display = 'block';
      if(value === 'all') post.style.display = "block";
      else post.style.display = 'none';

    });
    }



  return (
    <>
      <div className={'darkBG'} onClick={() => setIsOpen(false)} />
      <div className={'centered'}>
        <div className={'modal'}>
          <div className={'modalHeader'}>
            <h5 className={'heading'}>Filtrer</h5>
          </div>
          <button className={'closeBtn'} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={'modalContent'}>
            <label htmlFor="filtre">Choisir un filtre :</label>

            <select name={"job"} onChange={handleChange}>
              <option name="all" value="all">Aucun</option>
              <option name="Photographe" value="Photographe">Photographe</option>
              <option name="Architecte" value="Architecte">Architecte</option>
              <option name="Cuisinier" value="Cuisinier">Cuisinier</option>
              <option name="Styliste" value="Styliste">Styliste</option>
              <option name="Fleuriste" value="Fleuriste">Fleuriste</option>
              <option name="Ostéopathe" value="Ostéopathe">Ostéopathe</option>
              <option name="Webmaster" value="Webmaster">Webmaster</option>
              <option name="Graphiste" value="Graphiste">Graphiste</option>
              <option name="Coiffeur" value="Coiffeur">Coiffeur</option>
              <option name="Sommelier" value="Sommelier">Sommelier</option>
              <option name="Notaire" value="Notaire">Notaire</option>
              <option name="Garagiste" value="Garagiste">Garagiste</option>
            </select>
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

export default FilterModalComponent
