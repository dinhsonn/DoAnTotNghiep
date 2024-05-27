import { useEffect, useState } from "react";
import "./Header.css";
import CategoryServices from "../../services/CategoryServices";
import MenuServices from "../../services/MenuServices";
import ProductServices from "../../services/ProductServices";
import { Link , useNavigate  } from "react-router-dom";

function Menu() {
  const [categories, setCategories] = useState([]);
  const [categoryoptions, setCategoryoptions] = useState([]);
  const [productValues, setProductValues] = useState([]);
  const [optionValues, setOptionValues] = useState({});
  const [menus, setMenus] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null); 
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
    <div className="header-bottom sticky-header">
      <div className="container">
        <div className="header-left">
          <div className="dropdown category-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
              title="Browse Categories"
            >
              Danh mục sản phẩm <i className="icon-angle-down" />
            </a>
            <div className="dropdown-menu">
              <nav className="side-nav">
                <ul className="menu-vertical sf-arrows">
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
              </nav>
            </div>
            {/* End .dropdown-menu */}
          </div>
          {/* End .category-dropdown */}
        </div>
        {/* End .header-left */}
        <div className="header-center">
          <nav className="main-nav">
            <ul className="menu sf-arrows">
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
            {/* End .menu */}
          </nav>
          {/* End .main-nav */}
        </div>
        {/* End .header-center */}
        <div className="header-right">
          <i className="la la-lightbulb-o" />
          <p>
            Giảm giá<span className="highlight">&nbsp;lên đến 30%</span>
          </p>
        </div>
      </div>
      {/* End .container */}
    </div>
  );
}

export default Menu;
