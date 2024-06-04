import { useEffect, useState } from "react";
import AboutService from "../../../services/AboutServices";
import { Link } from "react-router-dom";
import TrashServices from "../../../services/TrashServices";

function About() {
    const [abouts, setAbouts] = useState([]);
    const [filteredAbouts, setFilteredAbouts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadAbouts();
    }, []);

    const loadAbouts = async () => {
        try {
            const response = await AboutService.getAll();
            setAbouts(response.data.content);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const removeAbout = async (id) => {
        try {
            await AboutService.remove(id);
            const aboutToMoveToTrash = abouts.find(about => about.id === id);
            await TrashServices.createAbout(aboutToMoveToTrash);
            setAbouts(abouts.filter((about) => about.id !== id));
            console.log("About deleted successfully");
            alert("About đã được xóa!");
        } catch (error) {
            console.error("Error deleting about:", error);
        }
    };
    
    useEffect(() => {
        const filteredAbouts = abouts.filter((about) =>
            about.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAbouts(filteredAbouts);
    }, [searchTerm, abouts]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">About</h1>
                <Link to={"/about/create"} className="btn-add">Thêm mới</Link>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="user_index.html">Tất cả ({abouts.length})</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><Link to={"/about/trash"}>Rác (12)</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 text-end">
                        <input type="text" className="search d-inline" onChange={handleSearch} />
                        <button className="d-inline btnsearch">Tìm kiếm</button>
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
                        {filteredAbouts.map((about, index) => (
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
                                        <Link to={`/about/show/${about.id}`} className="text-primary mx-1">
                                            <i className="fa fa-eye"></i>
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
