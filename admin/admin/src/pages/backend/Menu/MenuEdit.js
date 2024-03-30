import { useEffect, useState } from "react";
import MenuServices from "../../../services/MenuServices";
import { useParams } from "react-router-dom";
import MenuService from "../../../services/MenuServices";
function MenuEdit() {
  let { id } = useParams();
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
    MenuServices.getById(id)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });

    MenuService.getAll()
      .then((response) => {
        setMenus(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MenuServices.update(formData, id)
      .then((response) => {
        console.log("Updated menu:", response.data);
        alert("Menu đã được cập nhật thành công!");
      })
      .catch((error) => {
        console.error("Error updating menu:", error);
      });
  };
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Cập nhật menu</h1>
        <div className="text-end">
          <a href="menu_index.html" className="btn btn-sm btn-success">
            <i className="fa fa-arrow-left"></i> Về danh sách
          </a>
        </div>
      </section>
      <section className="content-body my-2">
      <form onSubmit={handleSubmit}> 
        <div className="row">
          <div className="col-md-9">
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Tên menu</strong>
              </label>
              <input
                value=""
                type="text"
                name="name"
                id="name"
                className="form-control"
                
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="link">
                <strong>Liên kết</strong>
              </label>
              <input
                value=""
                type="text"
                name="link"
                id="link"
                className="form-control"
                onChange={handleChange}
                value={formData.link}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="link">
                <strong>Vị trí</strong>
              </label>
              <input
                value=""
                type="text"
                name="position"
                id="position"
                className="form-control"
                onChange={handleChange}
                value={formData.position}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position">
                <strong>Loại</strong>
              </label>
              <select name="type" id="type" className="form-control" onChange={handleChange} value={formData.type}>
                <option value="0">Main Menu</option>
                <option value="1">Footer Menu</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box-container mt-4 bg-white">
              <div className="box-header py-1 px-2 border-bottom">
                <strong>Đăng</strong>
              </div>
              <div className="box-body p-2 border-bottom">
                <p>Chọn trạng thái đăng</p>
                <select name="status" className="form-control" onChange={handleChange} value={formData.status}>
                  <option value="0">Xuất bản</option>
                  <option value="1">Chưa xuất bản</option>
                </select>
              </div>
              <div className="box-footer text-end px-2 py-3">
                <button
                  type="submit"
                  className="btn btn-success btn-sm text-end"
                >
                  <i className="fa fa-save" aria-hidden="true"></i> Đăng
                </button>
              </div>
            </div>
            <div className="box-container mt-2 bg-white">
              <div className="box-header py-1 px-2 border-bottom">
                <strong>Cấp cha</strong>
              </div>
              <select name="parent_id" id="parent_id" className="form-control" onChange={handleChange} value={formData.parentId}>
                <option >Chọn danh mục</option>
                {menus.map(menu => (
                         <option key={menu.id} value={menu.id}>{menu.name}</option>
                  ))}
              </select>
            </div>
       
          </div>
        </div>
        </form>
      </section>
    </div>
  );
}

export default MenuEdit;
