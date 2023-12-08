import React from 'react'
import './Home.css'
import Navbar from '../../components/navbar/Navbar'
import Carousel from '../../components/Carousel/Carousel'
// import Content from '../../components/Content/Content'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      {/* <Content /> */}
    </div>
  )
}

export default Home;