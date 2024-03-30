import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuServices from "../../../services/MenuServices";
function Menu() {
  const [menus, setMenus] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    position: "0",
    type: "",
    status: "0",
    parentId: "",
  });
  useEffect(() => {
    loadMenu();
  }, [formData]);

  const loadMenu = () => {
    MenuServices.getAll()
      .then((response) => {
        setMenus(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const removeMenu = (id) => {
    MenuServices.remove(id)
      .then(() => {
        setMenus(menus.filter((menu) => menu.id !== id));

        alert("Menu đã được xóa!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    MenuServices.create(formData)
      .then((response) => {
        console.log("Tạo menu thành công:", response.data);
        alert("Thêm menu thành công!");
        loadMenu();
      })
      .catch((error) => {
        console.error("Lỗi khi tạo mới menu:", error);
      });
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Quản lý menu</h1>
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li>
                <a href="menu_index.html">Tất cả (123)</a>
              </li>
              <li>
                <a href="#">Xuất bản (12)</a>
              </li>
              <li>
                <a href="menu_trash.html">Rác (12)</a>
              </li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <input type="text" className="search d-inline" />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group">
              <li className="list-group-item mb-2">
                <select name="postion" className="form-control">
                  <option value="mainmenu">Main Menu</option>
                  <option value="footermenu">Footer Menu</option>
                </select>
              </li>
          
              <li className="list-group-item mb-2 border">
                <a
                  className="d-block"
                  href="#multiCollapseCustom"
                  data-bs-toggle="collapse"
                >
                  Tùy biến liên kết
                </a>
                <form onSubmit={handleSubmit}>
                  <div
                    className="collapse multi-collapse border-top mt-2"
                    id="multiCollapseCustom"
                  >
                    <div className="mb-3">
                      <label>Tên menu</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Liên kết</label>
                      <input
                        type="text"
                        name="link"
                        className="form-control"
                        value={formData.link}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Vị trí</label>
                      <input
                        type="number"
                        name="position"
                        className="form-control"
                        value={formData.position}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Loại</label>
                      <select
                        name="status"
                        className="form-control"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="0">mainmenu</option>
                        <option value="1">footermenu</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Trạng thái</label>
                      <select
                        name="status"
                        className="form-control"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="0">Xuất bản</option>
                        <option value="1">Chưa xuất bản</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Menu cha</label>
                      <select
                        name="parentId"
                        className="form-control"
                        value={formData.parentId}
                        onChange={handleChange}
                      >
                        <option>Chọn menu cha</option>
                        {menus.map((menu) => (
                          <option key={menu.id} value={menu.id}>
                            {menu.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="my-3">
                      <button
                        name="ADDCUSTOM"
                        type="submit"
                        className="btn btn-sm btn-success form-control"
                      >
                        Thêm
                      </button>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <div className="row mt-1 align-items-center">
              <div className="col-md-8">
                <select name="" className="d-inline me-1">
                  <option value="">Hành động</option>
                  <option value="">Bỏ vào thùng rác</option>
                </select>
                <button className="btnapply">Áp dụng</button>
              </div>
              <div className="col-md-4 text-end">
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-sm justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link">&laquo;</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        &raquo;
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "30px" }}>
                    <input type="checkbox" id="checkboxAll" />
                  </th>
                  <th>Tên menu</th>
                  <th>Liên kết</th>
                  <th>ParentId</th>
                  <th>Loại</th>
                  <th>Vị trí</th>
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {menus.map((menu, index) => (
                  <tr className="datarow">
                    <td className="text-center">
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <div className="name">{menu.name}</div>
                      <div className="function_style">
                        <a href="#" className="px-1 text-success">
                          <i className="fa fa-toggle-on"></i>
                        </a>
                        <Link
                          to={`/menu/edit/${menu.id}`}
                          className="px-1 text-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          to={`/menu/show/${menu.id}`}
                          className="px-1 text-info"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <a
                          href="#"
                          className="px-1 text-danger"
                          onClick={() => removeMenu(menu.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                    <td>{menu.link}</td>
                    <td>{menu.parentId}</td>
                    <td>{menu.type === "0" ?"MainMenu":"FooterMenu"}</td>
                    <td>{menu.position }</td>
                    <td className="text-center">{menu.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Menu;
