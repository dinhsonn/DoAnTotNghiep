import { useEffect, useState } from "react";
import AboutService from "../../../services/AboutServices";
import { Link } from "react-router-dom";

function About() {
    const [abouts, setAbouts] = useState([]);

    useEffect(() => {
        AboutService.getAll()
            .then(response => {
                setAbouts(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const removeAbout = (id) => {
        AboutService.remove(id)
            .then(() => {
                setAbouts(abouts.filter(about => about.id !== id));
                console.log("About item deleted successfully");
                alert("Mục About đã được xóa!");
            })
            .catch(error => {
                console.error('Error deleting About item:', error);
            });
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">About</h1>
                <Link to={"/about/create"} className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="user_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><Link to={"/admin/trash"}>Rác (12)</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 text-end">
                        <input type="text" className="search d-inline" />
                        <button className="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                </div>
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
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">&raquo;</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{width: '30px'}}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Trạng thái</th>
                            <th className="text-center" style={{width: '30px'}}>ID</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abouts.map((about, index) => (
                            <tr className="datarow" key={index}>
                                <td className="text-center">
                                    <input type="checkbox" id="checkId" />
                                </td>
                                <td>{about.title}</td>
                                <td>{about.content}</td>
                                <td>{about.status}</td>
                                <td className="text-center">{about.id}</td>
                                <td className="text-center">
                                    <div className="function_style">
                                        <Link to={`/about/edit/${about.id}`} className="text-primary mx-1">
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                        <Link to="#" className="text-danger mx-1" onClick={() => removeAbout(about.id)}>
                                            <i className="fa fa-trash"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default About;
