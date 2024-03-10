import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopicServices from "../../../services/TopicServices";
function TopicShow() {
   let { id } = useParams();
   const [topic, setTopic] = useState({});
   const [parentTopic, setParentTopic] = useState(null);
   useEffect(() => {
      TopicServices.getById(id)
          .then(response => {
            setTopic(response.data);
            // Kiểm tra nếu topic có parentId thì lấy thông tin của danh mục cha
            if (response.data.parentId) {
               TopicServices.getById(response.data.parentId)
                .then(parentResponse => {
                  setParentTopic(parentResponse.data);
                })
                .catch(error => {
                  console.error('Error fetching parent category data:', error);
                });
            }
          })
          .catch(error => {
              console.error('Error fetching category data:', error);
          });
  }, [id]);
    return (    
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <a href="topic_index.html" className="btn btn-primary btn-sm">
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
              <th style={{width: '180px'}}>Tên trường</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Id</td>
              <td>{topic.id}</td>
            </tr>
            <tr>
              <td>Tên danh mục</td>
              <td>{topic.name}</td>
            </tr>
            <tr>
              <td>Danh mục cha</td>
              <td>{parentTopic ? parentTopic.name : "None"}</td>
            </tr>
            <tr>
              <td>Thứ tự</td>
              <td>{topic.sortOrder}</td>
            </tr>
            <tr>
              <td>Trạng thái</td>
              <td>{topic.status === 0 ? "Xuất bản" : "Chưa xuất bản"}</td>
            </tr>
          </tbody>
        </table>

    </section>
 </div> );
}

export default TopicShow;