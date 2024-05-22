import { useState, useEffect } from "react";
import TrashServices from "../../../services/TrashServices";

function ContactTrash() {
    const [trashContacts, setTrashContacts] = useState([]);

    useEffect(() => {
        loadTrashContacts();
    }, []);

    const loadTrashContacts = () => {
      TrashServices.getAllContact()
            .then(response => {
                setTrashContacts(response.data.content);
                console.log("Trash contacts data", response.data.content);
            })
            .catch(error => {
                console.error('Error fetching trash contacts:', error);
            });
    };

    const restoreContact = async (id) => {
        try {
            await TrashServices.restore(id);
            setTrashContacts(trashContacts.filter(contact => contact.id !== id));
            console.log("Contact restored successfully");
            alert("Liên hệ đã được khôi phục!");
        } catch (error) {
            console.error("Error restoring contact:", error);
        }
    };

    const deleteContactPermanently = async (id) => {
        try {
            await TrashServices.delete(id);
            setTrashContacts(trashContacts.filter(contact => contact.id !== id));
            console.log("Contact deleted permanently");
            alert("Liên hệ đã bị xóa vĩnh viễn!");
        } catch (error) {
            console.error("Error deleting contact permanently:", error);
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Đơn đã hoàn thành</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="#">Tất cả ({trashContacts.length})</a></li>
                            <li><a href="#">Rác ({trashContacts.length})</a></li>
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
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Tiêu đề</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trashContacts.map((contact) => (
                            <tr className="datarow" key={contact.id}>
                                <td className="text-center">
                                    <input type="checkbox" id={`checkId-${contact.id}`} />
                                </td>
                                <td>
                                    <div className="name">
                                        <a href="contact_reply.html">{contact.name}</a>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-primary mx-1" onClick={() => restoreContact(contact.id)}>
                                            <i className="fa fa-undo"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1" onClick={() => deleteContactPermanently(contact.id)}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>{contact.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ContactTrash;
