import '../css/App.css'
import TopBar from '../Components/TopBar'
import PostsHomePage from '../Components/PostsHomePage'
import React, { useEffect, useState } from 'react'
import LoaderComponent from '../Components/LoaderComponent'

const Home = () => {

  const [responseData, setResponseData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://unl87haa1i.execute-api.us-east-1.amazonaws.com/dev/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setResponseData(data.reverse())
          })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Assurez-vous de passer une dépendance vide pour exécuter useEffect une seule fois


  return (
    <div>
      <TopBar />
      {!responseData ? (
        <LoaderComponent />
      ) : (
        <PostsHomePage posts={responseData} />
      )}
    </div>

  )
}

export default Home