import React, { useEffect, useState } from "react";
import axios from "axios";
import Dish from "../../components/Dishes/Dish";
import Navbar from "../../components/navbar/Navbar";
import "./Menu.css";
import food1 from "./food.jpg";
import footer from '../../components/shape/footer.svg';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios.get('api ở đây')
  //     .then((response) => setRooms(response.data))
  //     .catch((err) => setError(err));
  // }, []);

  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="index">
      <Navbar />
      <img className="background" alt="background" src={food1} />
      <div className="text-wrapper-0">Discover Our Menus</div>
      <div className="overlap-1">
        <Dish />
      </div>
      <div className="overlap-9">
        <img className="footer" alt="Footer" src={footer} />
        <p className="footer-2">
          2112736 - Phan Phước Hải Nam
          <br />
          <br />
          21127433 -Ngô Thị Thanh Thảo
          <br />
          <br />
          21127644 - Huỳnh Cao Minh
        </p>
        <p className="footer-3">
          <br />
          <br />
          21127700 - Lê Phước Thịnh Tiến
          <br />
          <br />
          21127704 - Phạm Khánh Toàn
        </p>
        <div className="footer-4">GROUP NICE</div>
      </div>
    </div>
  );
};

export default Menu;
