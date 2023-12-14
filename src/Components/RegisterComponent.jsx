import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Link, useNavigate } from 'react-router-dom' // Importez useHistory depuis react-router-dom
import { PatternFormat } from 'react-number-format' // Lib pour les formats de numéro de téléphone
import '../css/Connection.css'

const RegistrationForm = () => {
  const navigate = useNavigate() // Initialisez useHistory

  // select input from https://codesandbox.io/p/sandbox/country-dropdown-with-react-select-w0rk6
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})

  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code',
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries)
        setSelectedCountry(data.userSelectValue)
      })
  }, [])

  // State pour stocker les valeurs des champs du formulaire
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    job: '',
    password: '',
  })

  const [addressData, setAddressData] = useState({
    address: '',
    postal_code: '',
    city: '',
    country: '',
  })

  // Fonction de gestion des changements de champ
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  // gestion des changements de champ pour l'adresse
  const handleAddressInfoChange = (e) => {
    const { name, value } = e.target
    setAddressData({ ...addressData, [name]: value })
  }
  const handleCountryChange = (e) => {
    const value = e.value
    setSelectedCountry(e)
    setAddressData({ ...addressData, ['country']: value })
  }
  const allData = {
    ...userData,
    ...addressData,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Effectuez votre requête ici, par exemple avec fetch
      await fetch(
        'https://unl87haa1i.execute-api.us-east-1.amazonaws.com/dev/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
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
          navigate('/login')
        })
    } catch (error) {
      console.error('Erreur lors de la requête', error)
    }
  }

  return (
    <div className='container'>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <div className='input-line'>
            <h5>Personnal Informations</h5>
            <input
              className='user'
              type='text'
              name='last_name'
              required
              placeholder='Enter your last name'
              value={userData.last_name}
              onChange={handleUserInfoChange}
            />
            <input
              className='user'
              type='text'
              name='first_name'
              required
              placeholder='Enter your first name'
              value={userData.first_name}
              onChange={handleUserInfoChange}
            />
          </div>

          <div className='input-line'>
            <h5>Address Informations</h5>
            <input
              type='text'
              name='postal_code'
              required
              placeholder='Enter your postal code XXX XXX'
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
              placeholder='Enter your city'
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
            <h5>Contact Informations</h5>
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
              placeholder='Enter your email'
              value={userData.email}
              onChange={handleUserInfoChange}
            />
          </div>
          <select onChange={handleUserInfoChange} name={"job"} placeholder="Enter your job">
            <option name="Photographe" value="Photographe">Photographe</option>
            <option name="Architecte" value="Architecte">Architecte</option>
            <option name="Cuisinier" value="Cuisinier">Cuisinier</option>
            <option name="Styliste" value="Styliste">Styliste</option>
            <option name="Fleuriste" value="Fleuriste">Fleuriste</option>
            <option name="Ostéopathe" value="Ostéopathe">Ostéopathe</option>
            <option name="Webmaster" value="Webmaster">Webmaster</option>
            <option name="Graphiste" value="Graphiste">Graphiste</option>
            <option name="Webmaster" value="Webmaster">Webmaster</option>
            <option name="Coiffeur" value="Coiffeur">Coiffeur</option>
            <option name="Sommelier" value="Sommelier">Sommelier</option>
            <option name="Notaire" value="Notaire">Notaire</option>
            <option name="Garagiste" value="Garagiste">Garagiste</option>
          </select>
          <input
            type='password'
            name='password'
            required
            placeholder='Enter your password'
            value={userData.password}
            onChange={handleUserInfoChange}
            className={'password'}
          />
          <button type='submit'>Submit</button>
        </form>

        <Link to={'/login'}> Deja un compte ?</Link>
      </div>
    </div>
  )
}

export default RegistrationForm
