function Dashboard() {
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Blank Page</h1>
           <a href="" className="btn btn-secondary btn-sm">Thêm mới</a>
           <div className="row mt-3 align-items-center">
              <div className="col-6">
                 <ul className="manager">
                    <li><a href="#">Tất cả (123)</a></li>
                    <li><a href="#">Xuất bản (12)</a></li>
                    <li><a href="#">Rác (12)</a></li>
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
                 <select name="" className="d-inline me-1">
                    <option value="">Tất cả danh mục</option>
                 </select>
                 <select name="" className="d-inline me-1">
                    <option value="">Tất cả thương hiệu</option>
                 </select>
                 <button className="btnfilter">Lọc</button>
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


        </section>
     </div>

     );
}

export default Dashboard;