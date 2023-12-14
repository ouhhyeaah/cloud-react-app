import React, { useEffect, useState } from 'react'
import { PatternFormat } from 'react-number-format'
import { BsCheckCircleFill } from 'react-icons/bs'
import Select from 'react-select' // Lib pour les formats de numéro de téléphone

const UserInfoComponent = ({ userInfo }) => {

  const [userData, setUserData] = useState({
    email: localStorage.getItem('email'),
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    phone_number: userInfo.phone_number,
    job: userInfo.job,
    password: userInfo.password,
  })

  const [addressData, setAddressData] = useState({
    address: userInfo.address,
    postal_code: userInfo.postal_code,
    city: userInfo.city,
    country: userInfo.country,
  })
  const allData = {
    ...userData,
    ...addressData,
  }

  // Gestion du select pour les pays
  const [countries, setCountries] = useState([''])
  const [selectedCountry, setSelectedCountry] = useState({ '': '' })
  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code',
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries)
        const userSelectValue = data.countries.filter(
          (country) => country.value === userInfo.country,
        )
        setSelectedCountry(userSelectValue[0])
      })
  }, [userInfo.country])


  const handleCountryChange = (e) => {
    const value = e.value
    setSelectedCountry(e)
    setAddressData({ ...addressData, 'country': value })
  }
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  // gestion des changements de champ pour l'adresse
  const handleAddressInfoChange = (e) => {
    const { name, value } = e.target
    setAddressData({ ...addressData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Effectuez votre requête ici, par exemple avec fetch
      await fetch(
        'https://unl87haa1i.execute-api.us-east-1.amazonaws.com/dev/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Connection: 'keep-alive',
          },
          body: JSON.stringify(allData),
        },
      )
        .then((response) => {
          console.log(response)
          if (!response.ok) {
            response.json().then((data) => {
              window.alert(data)
            })
          }
          return response.json() // Renvoie une nouvelle promesse
        })
        .then((data) => {
          window.alert('Profil mis à jour')
          console.log(data)
        })
    } catch (error) {
      console.error('Erreur lors de la requête', error)
    }
  }

  useEffect(() => {
    const currentJob = (document.getElementsByName(`${userInfo.job}`).item(0) )
    currentJob.setAttribute("selected", "selected")
  }, [])

  return (
    <div>
      <div className={'center col'}>
        <p> Profil crée le {userInfo.createdAt.split('|')[0]} à {userInfo.createdAt.split('|')[1]}</p>
        <p> Profil mis à jour le {userInfo.updatedAt.split('|')[0]} à {userInfo.updatedAt.split('|')[1]} </p>
        <form onSubmit={handleSubmit}>
          <div className='input-line'>
            <h5>Informations Personnelles</h5>
            <input
              className='user'
              type='text'
              name='last_name'
              required
              placeholder={'Nom de famille'}
              value={userData.last_name}
              onChange={handleUserInfoChange}
            />
            <input
              className='user'
              type='text'
              name='first_name'
              required
              placeholder={'Prénom'}
              value={userData.first_name}
              onChange={handleUserInfoChange}
            />
          </div>
          <div className='input-line'>
            <h5>Information localisation</h5>
            <input
              type='text'
              name='postal_code'
              required
              placeholder={'Code Postal'}
              maxLength={7}
              value={addressData.postal_code}
              onChange={handleAddressInfoChange}
              className={'home'}
            />
            <input
              type='text'
              name='address'
              required
              placeholder='Enter your address'
              value={addressData.address}
              onChange={handleAddressInfoChange}
              className={'home'}

            />
          </div>
          <div className='input-line'>
            <input
              type='text'
              name='city'
              required
              placeholder={userInfo.city}
              value={addressData.city}
              onChange={handleAddressInfoChange}
            />
            <Select
              options={countries}
              value={selectedCountry}
              name='country'
              required
              onChange={handleCountryChange}
            />
          </div>
          <div className='input-line'>
            <h5>Informations de contact</h5>
            {/*// https://s-yadav.github.io/react-number-format/docs/intro*/}
            <PatternFormat
              format='+1 (###)-####-###'
              placeholder={'Format : (###)-####-###'}
              name={'phone_number'}
              required
              value={userData.phone_number}
              onChange={handleUserInfoChange}
            />
            <input
              type='email'
              name='email'
              id={'email'}
              required
              disabled={true}
              placeholder={userInfo.email}
              value={userData.email}
              onChange={handleUserInfoChange}
            />
          </div>


          <input
            type='password'
            name='password'
            placeholder='*****'
            onChange={handleUserInfoChange}
            className={'password'}
          />
          <button
            className={'save-button'}>
            Sauvegarder
            <BsCheckCircleFill />
          </button>
        </form>

      </div>
    </div>
  )
}

export default UserInfoComponent