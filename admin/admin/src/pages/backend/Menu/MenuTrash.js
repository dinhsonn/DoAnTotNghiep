import { useState, useEffect } from "react";
import TrashServices from "../../../services/TrashServices";
import MenuService from "../../../services/MenuServices";
import { Link } from "react-router-dom";

function MenuTrash() {
    const [trashMenus, setTrashMenus] = useState([]);

    useEffect(() => {
        loadTrashMenus();
    }, []);

    const loadTrashMenus = () => {
        TrashServices.getAllMenu()
            .then(response => {
                setTrashMenus(response.data.content);
                console.log("Trash menus data", response.data.content);
            })
            .catch(error => {
                console.error('Error fetching trash menus:', error);
            });
    };

    const restoreMenu = async (id) => {
        try {
            await TrashServices.removeMenu(id);
            await MenuService.create(trashMenus.find(menu => menu.id === id));
            setTrashMenus(trashMenus.filter(menu => menu.id !== id));
            console.log("Menu restored successfully");
            alert("Menu đã được khôi phục!");
        } catch (error) {
            console.error("Error restoring menu:", error);
        }
    };

    const deleteMenuPermanently = async (id) => {
        try {
            await TrashServices.removeMenu(id);
            setTrashMenus(trashMenus.filter(menu => menu.id !== id));
            console.log("Menu deleted permanently");
            alert("Menu đã bị xóa vĩnh viễn!");
        } catch (error) {
            console.error("Error deleting menu permanently:", error);
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác menu</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><Link to="/menu">Trang chính</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th>Tên menu</th>
                            <th>Liên kết</th>
                            <th>Vị trí</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trashMenus.map((menu) => (
                            <tr className="datarow" key={menu.id}>
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId-${menu.id}`} />
                                </td>
                                <td>
                                    <div className="name">
                                        <a href="menu_show.html">{menu.name}</a>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-primary mx-1" onClick={() => restoreMenu(menu.id)}>
                                            <i className="fa fa-undo"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1" onClick={() => deleteMenuPermanently(menu.id)}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>{menu.link}</td>
                                <td>{menu.position}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default MenuTrash;
