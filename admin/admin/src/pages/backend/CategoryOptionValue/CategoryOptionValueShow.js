import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryServices from "../../../services/CategoryServices";
function CategoryOptionValueShow() {
  let { id } = useParams();
  const [categoryoptionvalues, setCategoryOptionValues] = useState([]);
  const [categoryname, setCategoryname] = useState([]);
  useEffect(() => {
    loadProductOptionValue();
  }, [id]);

  const loadProductOptionValue = async () => {
    try {
      const response = await CategoryServices.categoryOptionValueById(id);
      setCategoryOptionValues(response.data);
      setCategoryname(response.data.option.name);
    } catch (error) {
      console.error("Error loading sale:", error);
    }
  };

  if (!categoryoptionvalues) {
    return <div>Loading...</div>;
  }
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Chi tiết</h1>
        <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
            <a href="/categoryoptionvalue" className="btn btn-primary btn-sm">
              <i className="fa fa-arrow-left"></i> Về danh sách
            </a>
            <a href="topic_edit.html" className="btn btn-success btn-sm">
              <i className="fa fa-edit"></i> Sửa
            </a>
            <a href="topic_index.html" className="btn btn-danger btn-sm">
              <i className="fa fa-trash"></i> Xóa
            </a>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "180px" }}>Tên trường</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Id</td>
              <td>{categoryoptionvalues.id}</td>
            </tr>
            <tr>
              <td>Tên giá trị option</td>
              <td>{categoryoptionvalues.value}</td>
            </tr>
            <tr>
              <td>ID Option</td>
              <td>{categoryname}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default CategoryOptionValueShow;
