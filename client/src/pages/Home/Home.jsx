import React from 'react';
import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import HomePage1 from '../../components/HomePage1/HomePage1';
import HomePage2 from '../../components/HomePage2/HomePage2';
import HomePage3 from '../../components/HomePage3/HomePage3';
import HomePage4 from '../../components/HomePage4/HomePage4';
import HomePage5 from '../../components/HomePage5/HomePage5';
import HomePage6 from '../../components/HomePage6/HomePage6';
import HomePage7 from '../../components/HomePage7/HomePage7';
import HomePage8 from '../../components/HomePage8/HomePage8';
import shape1 from '../../components/shape/rectangle-3.svg';
import line1 from '../../components/shape/line-2.svg';
import line2 from '../../components/shape/line-3.svg';
import line3 from '../../components/shape/line-4.svg';
import line4 from '../../components/shape/line-1.svg';
import footer from '../../components/shape/footer.svg';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <HomePage1 />
      <div className="intro">
        <div className="overlap-group">
        <p className="welcome-to-nice">
          Welcome to Nice Hotel and Restaurant, where luxury meets comfort and your satisfaction is our top
          priority. We&#39;re thrilled to have you here and hope you have a delightful stay with us.
        </p>
        </div>
      </div>
      <div className="text-wrapper-1">Outstanding Features</div>
      <div className="overlap-2">
        <div className="overlap-3">
        <HomePage2 />
        <HomePage3 />
        </div>
        <p className="p">
          Immerse yourself in our sophisticated and meticulously designed spaces where modern elegance meets timeless
          charm. Our curated art and local materials seamlessly blend with our architecture, offering unparalleled
          comfort and cultural allure.
        </p>
        <p className="text-wrapper-2">
            With a keen eye for detail, our renowned designers have woven the essence of our locale into every aspect,
            from the curated art pieces that adorn the walls to the carefully selected local materials that harmonize
            effortlessly with our architecture. Indulge in a symphony of refined taste and cultural allure as you embark
            on a journey of unparalleled comfort and style.
        </p>
      </div>
      <div className="overlap-4">
        <HomePage4 />
        <div className="overlap-5">
          <HomePage5 />
          <HomePage6 />
          <div className="restaurant-group">
            <div className="overlap-6">
              <img className="rectangle-2" alt="Rectangle" src= {shape1} /> 
              <img className="line" alt="Line" src={line1}/>
              <img className="line-2" alt="Line" src={line2} /> 
              <p className="celebrate">
                Celebrate the art of dining at our restaurant, where <br />
                world-class chefs craft exquisite menus using locally <br />
                sourced ingredients. Each dish is a fusion of timeless <br />
                flavors and innovative techniques, creating an <br />
                unforgettable culinary experience. Our sommeliers <br />
                expertly curate wine pairings that complement every bite, <br />
                inviting you to savor a symphony of flavors in every moment.
              </p>
              <div className="text-wrapper">Restaurant</div>
              <img className="line-3" alt="Line" src={line3} />
              <img className="line-4" alt="Line" src={line4} />
            </div>
          </div>
          <div className="room-group">
            <div className="overlap-7">
              <img className="rectangle-3" alt="Rectangle" src= {shape1} />
              <img className="line-5" alt="Line" src={line1}/>
              <img className="line-6" alt="Line" src={line2} />  
              <img className="line-7" alt="Line" src={line3} />
              <img className="line-8" alt="Line" src={line4} />
              <div className="text-wrapper3">Room</div>
            </div>
          </div>
        </div>
      </div>
      <img className="line-13" alt="Line" src={line2} />  
      <img className="line-14" alt="Line" src={line3} />
      <p className="text-wrapper-8">
      Discover our guestrooms and suites—a blend of luxury and comfort. Enjoy stunning views and a 
      space that inspires relaxation and personal pursuits. Each room is a haven of sophistication, offering a 
      perfect balance between comfort and intellectual stimulation, inviting you to indulge in a unique experience of refined living.
      </p>
      <div className="overlap-8">
        <HomePage8 />
        <div className="pool-group">
          <img className="line-9" alt="Line" src={line2}/>
          <img className="line-10" alt="Line" src={line2} />  
          <img className="line-11" alt="Line" src={line3} />
          <img className="line-12" alt="Line" src={line3} />
          <p className="cool-off">
            Cool off and unwind in our inviting <br />
            pool, an oasis of relaxation and <br />
            refreshment. Bask in the sun while <br />
            enjoying the tranquil ambience or <br />
            take a leisurely swim in our <br />
            beautifully designed pool. <br />
            Surrounded by elegant landscaping <br />
            and luxurious amenities, our pool <br />
            offers a serene escape, inviting you <br />
            to rejuvenate and unwind in style.
          </p>
          <div className="text-wrapper-7">Pool</div>
        </div>
        
        <div className="overlap-wrapper">
        <p className="text-wrapper-10">
          Discover a haven where design transcends boundaries and elegance knows no limits. 
          Nice Hotel and Restaurant is a testament to meticulous design and unparalleled craftsmanship, 
          where world-class designers have lent their expertise to create an ambiance of sheer luxury. 
          From the awe-inspiring architecture that captivates the eye to the bespoke interiors that exude sophistication, 
          every element has been thoughtfully curated.
        </p>
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
      </div>
    </div>
  );
};

export default Home;
