import { useEffect, useState } from "react";
import "./Header.css";
import CategoryServices from "../../services/CategoryServices";
import MenuServices from "../../services/MenuServices";
import ProductServices from "../../services/ProductServices";
import { Link , useNavigate  } from "react-router-dom";
import axios from 'axios'; //
function Menu_mobile() {
  const [categories, setCategories] = useState([]);
  const [categoryoptions, setCategoryoptions] = useState([]);
  const [productValues, setProductValues] = useState([]);
  const [optionValues, setOptionValues] = useState({});
  const [menus, setMenus] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    CategoryServices.getAll()
      .then((response) => {
        setCategories(response.data.content);
        console.log("cte", response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function getCategoryOptions(categoryId) {
    if (hoveredCategoryId !== categoryId) { // Kiểm tra xem đã hover category đó chưa
      CategoryServices.categoryOptionByCategoryId(categoryId)
        .then((response) => {
          setCategoryoptions(response.data.content);
          response.data.content.forEach((option) => {
            getOptionValues(option.id);
          });
        })
        .catch((error) => {
          console.error("Error fetching category options:", error);
        });
      setHoveredCategoryId(categoryId); // Đánh dấu đã hover category này
    }
  }

  function getOptionValues(option) {
    CategoryServices.categoryOptionValueByOption(option)
      .then((response) => {
        setOptionValues((prevOptionValues) => ({
          ...prevOptionValues,
          [option]: response.data.content,
        }));
      })
      .catch((error) => {
        console.error("Error fetching option values:", error);
      });
  }
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log(`User searched for: ${searchQuery}`);

    // Gửi thông tin tìm kiếm tới backend
    try {
      await axios.post('http://localhost:8082/api/search-log', { query: searchQuery });
    } catch (error) {
      console.error('Error logging search query:', error);
    }

    // Điều hướng tới trang kết quả tìm kiếm
    navigate(`/search?q=${searchQuery}`);
  };
  useEffect(() => {
    MenuServices.getAll()
      .then((response) => {
        const filteredMenus = response.data.content.filter(
          (menu) => menu.type === "0"
        );
        const sortedMenus = filteredMenus.sort(
          (a, b) => a.position - b.position
        );
        setMenus(sortedMenus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  function handleOptionValueClick(categoryOptionValueId) {
    ProductServices.getProductsByCategoryOptionValue(categoryOptionValueId)
      .then((response) => {
        setProductValues(response.data);
        navigate(`/product?categoryOptionValueId=${categoryOptionValueId}`);
      })
      .catch((error) => {
        console.error("Error fetching products by option value:", error);
      });
  }
    return ( 
        <>
  {/* Mobile Menu */}
  <div className="mobile-menu-overlay" />
  {/* End .mobil-menu-overlay */}
  <div className="mobile-menu-container">
    <div className="mobile-menu-wrapper">
      <span className="mobile-menu-close">
        <i className="icon-close" />
      </span>
      <form onSubmit={handleSearchSubmit} className="mobile-search">
        <label htmlFor="mobile-search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          className="form-control"
          name="mobile-search"
          id="mobile-search"
          placeholder="Tìm kiếm ..."
          value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
        />
        <button className="btn btn-primary" type="submit">
          <i className="icon-search" />
        </button>
      </form>
      <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="mobile-menu-link"
            data-toggle="tab"
            href="#mobile-menu-tab"
            role="tab"
            aria-controls="mobile-menu-tab"
            aria-selected="true"
          >
            Menu
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="mobile-cats-link"
            data-toggle="tab"
            href="#mobile-cats-tab"
            role="tab"
            aria-controls="mobile-cats-tab"
            aria-selected="false"
          >
            Danh mục
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="mobile-menu-tab"
          role="tabpanel"
          aria-labelledby="mobile-menu-link"
        >
          <nav className="mobile-nav">
            <ul className="mobile-menu">
            {menus.map((parentMenu, index) => {
                if (!parentMenu.parentId) {
                  return (
                    <li key={parentMenu.id}>
                      <Link to={parentMenu.link} className="sf-with-ul">
                        {parentMenu.name}
                      </Link>
                      {menus.map((childMenu) => {
                        if (childMenu.parentId === parentMenu.id) {
                          return (
                            <ul key={childMenu.id}>
                              <li>
                                <a href="about.html" className="sf-with-ul">
                                  {childMenu.name}
                                </a>
                              </li>
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </li>
                  );
                }
                return null;
              })}
        
            </ul>
          </nav>
          {/* End .mobile-nav */}
        </div>
        {/* .End .tab-pane */}
        <div
          className="tab-pane fade"
          id="mobile-cats-tab"
          role="tabpanel"
          aria-labelledby="mobile-cats-link"
        >
          <nav className="mobile-cats-nav">
            <ul className="mobile-cats-menu">
            {categories.map((category, index) => {
                    return (
                      <li
                        className="item-lead"
                        key={category.id}
                        onMouseEnter={() => {
                          getCategoryOptions(category.id);
                        }}
                      >
                        <a href="#">{category.name}</a>
                        {categoryoptions.length > 0 && hoveredCategoryId === category.id && (
                          <ul className="categoryoption">
                            <div className="row">
                              {categoryoptions.map((option, index) => (
                                <div className="col mx-4" key={index}>
                                  <p className="titleoptioncte">
                                    {option.name}
                                  </p>
                                  {optionValues[option.id] &&
                                    optionValues[option.id].map(
                                      (value, index) => (
                                        <a
                                          className="valuecte"
                                          href=""
                                          key={index}
                                          onClick={(e) => {
                                            e.preventDefault(); 
                                            handleOptionValueClick(value.id);
                                          }}
                                        >
                                          {value.value}
                                        </a>
                                      )
                                    )}
                                </div>
                              ))}
                            </div>
                          </ul>
                        )}
                      </li>
                    );
                  })}
            </ul>
            {/* End .mobile-cats-menu */}
          </nav>
          {/* End .mobile-cats-nav */}
        </div>
        {/* .End .tab-pane */}
      </div>
      {/* End .tab-content */}
      <div className="social-icons">
        <a href="#" className="social-icon" target="_blank" title="Facebook">
          <i className="icon-facebook-f" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Twitter">
          <i className="icon-twitter" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Instagram">
          <i className="icon-instagram" />
        </a>
        <a href="#" className="social-icon" target="_blank" title="Youtube">
          <i className="icon-youtube" />
        </a>
      </div>
      {/* End .social-icons */}
    </div>
    {/* End .mobile-menu-wrapper */}
  </div>
  {/* End .mobile-menu-container */}
</>

     );
}

export default Menu_mobile;