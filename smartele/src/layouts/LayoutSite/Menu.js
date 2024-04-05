import { useEffect } from "react";
import { useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import MenuServices from "../../services/MenuServices";
import { Link } from "react-router-dom";
function Menu() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

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
                  {categories.map((parentCategory, index) => {
                    if (!parentCategory.parentId) {
                      const hasChildren = categories.some(
                        (childCategory) =>
                          childCategory.parentId === parentCategory.id
                      );

                      return (
                        <li className="item-lead" key={parentCategory.id}>
                          <a href="#">{parentCategory.name}</a>
                          {hasChildren && (
                            <ul className="sub-menu">
                              {categories.map((childCategory) => {
                                if (
                                  childCategory.parentId === parentCategory.id
                                ) {
                                  return (
                                    <li key={childCategory.id}>
                                      <a href="#">{childCategory.name}</a>
                                    </li>
                                  );
                                }
                                return null;
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    }
                    return null;
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
                                {/* <ul>
                              <li>
                                <a href="about.html">About 01</a>
                              </li>
                            </ul> */}
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
