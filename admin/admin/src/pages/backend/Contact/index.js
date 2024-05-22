import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrashService from "../../../services/TrashServices";
import ContactService from "../../../services/ContactServices";

function Contact() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = () => {
        ContactService.getAll()
            .then(response => {
                setContacts(response.data.content);
                console.log("data", response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const removeContact = async (id) => {
        try {
            await ContactService.remove(id);
            const contactToMoveToTrash = contacts.find(contact => contact.id === id);
            await TrashService.createContact(contactToMoveToTrash);
            setContacts(contacts.filter((contact) => contact.id !== id));
            console.log("Contact deleted successfully");
            alert("Đã hoàn thành!");
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };
    const addContact = async (id) => {
        try {
            await ContactService.remove(id);
            const contactToMoveToTrash = contacts.find(contact => contact.id === id);
            await TrashService.createContact(contactToMoveToTrash);
            setContacts(contacts.filter((contact) => contact.id !== id));
            console.log("Contact deleted successfully");
            alert("Đã hoàn thành!");
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };


    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Liên hệ</h1></section>
            <section className="content-body my-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row mt-3 align-items-center">
                            <div className="col-12">
                                <ul className="manager">
                                    <li>
                                        <Link to="/contact">Tất cả ({contacts.length})</Link>
                                    </li>
                                    <li>
                                        <Link to={"/contact/success"}> Số lượng hoàn thành</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row my-2 align-items-center">
                            <div className="col-md-6">
                                <select name="" className="d-inline me-1">
                                    <option value="">Hành động</option>
                                    <option value="">Bỏ vào thùng rác</option>
                                </select>
                                <button className="btnapply">Áp dụng</button>
                            </div>
                            <div className="col-md-6 text-end">
                                <input type="text" className="search d-inline" />
                                <button className="d-inline">Tìm kiếm</button>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6">
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ width: "30px" }}>
                                        <input type="checkbox" id="checkboxAll" />
                                    </th>
                                    <th>Họ tên</th>
                                    <th>Điện thoại</th>
                                    <th>Email</th>
                                    <th>Tiêu đề</th>
                                    <th className="text-center" style={{ width: "30px" }}>ID</th>
                                    <th className="text-center" style={{ width: "100px" }}>Hoàn thành</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((contact, index) => (
                                    <tr className="datarow" key={contact.id}>
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId-${contact.id}`} />
                                        </td>
                                        <td>
                                            <div className="name">
                                                <a>{contact.name}</a>
                                            </div>
                                            <div className="function_style">
                                                <Link to={`/contact/edit/${contact.id}`} className="text-primary mx-1">
                                                    <i className="fa fa-edit"></i>
                                                </Link>
                                                <Link to={`/contact/show/${contact.id}`} className="text-info mx-1">
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                                <a href="#" className="text-danger mx-1" onClick={() => removeContact(contact.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </a>
                                            </div>
                                        </td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.content}</td>
                                        <td className="text-center">{contact.id}</td>
                                        <td><button onClick={() => addContact(contact.id)} className="btn btn-success btn-sm ml-1">Hoàn thành</button></td>
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

export default Contact;
