import React, { useEffect, useState } from 'react';
import TrashServices from "../../../services/TrashServices";
import AboutService from '../../../services/AboutServices';
import { Link } from "react-router-dom";

function AboutTrash() {
    const [abouts, setAbouts] = useState([]);

    useEffect(() => {
        loadAbouts();
    }, []);

    const loadAbouts = async () => {
        try {
            const response = await TrashServices.getAllAbout();
            setAbouts(response.data.content);
            console.log("Danh sách about trong thùng rác:", response.data.content);
        } catch (error) {
            console.error("Lỗi khi tải danh sách about từ thùng rác:", error);
        }
    };

    const removeAbout = async (id) => {
        try {
            await TrashServices.removeAbout(id);
            setAbouts(abouts.filter((about) => about.id !== id));
            console.log("About đã được xóa thành công");
            alert("About đã được xóa!");
        } catch (error) {
            console.error("Lỗi khi xóa about:", error);
        }
    };

    const restoreAbout = async (id) => {
        try {
            await TrashServices.removeAbout(id); // Xóa about khỏi thùng rác
            const aboutToRestore = abouts.find(about => about.id === id);
            await AboutService.create(aboutToRestore); // Khôi phục about
            setAbouts(abouts.filter((about) => about.id !== id)); // Cập nhật danh sách abouts
            console.log("About đã được khôi phục thành công");
            alert("About đã được khôi phục!");
        } catch (error) {
            console.error("Lỗi khi khôi phục about:", error);
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác</h1>
                <Link to={"/about"} className="btn-add">
          Quay lại
        </Link>
                <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li>
                <a href="product_index.html">Tất cả (123)</a>
              </li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <input type="text" className="search d-inline" />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th>Title</th>
                            <th>Content</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abouts.map((about, index) => (
                            <tr className="datarow" key={index}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <div className="title">
                                        <a href="#">{about.title}</a>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-primary mx-1" onClick={() => restoreAbout(about.id)}>
                                            <i className="fa fa-undo"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1" onClick={() => removeAbout(about.id)}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>{about.content}</td>
                                <td className="text-center">{about.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AboutTrash;
