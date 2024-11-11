import React, { useEffect, useState } from 'react'; 
import Footer from '../../components/Footer';
import '../../styles/CategoryProducts.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProducts = () => {

  const navigate = useNavigate();
  const { category } = useParams();

  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-restaurants');
      // Filter by category here, assuming restaurant.menu is an array that contains categories
      setRestaurants(response.data.filter(restaurant => restaurant.menu.includes(category)));
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter restaurants based on both category and search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categoryProducts-page">
      <h2>Restaurants Serving {category}</h2>

      {/* Search bar to filter results within the category */}
      <input
        type="text"
        placeholder={`Search within ${category}...`}
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      <div className="restaurants-container">
        <div className="restaurants-body">
          <h3></h3>
          <div className="restaurants">
            {filteredRestaurants.map((restaurant) => (
              <div className='restaurant-item' key={restaurant._id}>
                <div className="restaurant" onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
                  <img src={restaurant.mainImg} alt="" />
                  <div className="restaurant-data">
                    <h6>{restaurant.title}</h6>
                    <p>{restaurant.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
