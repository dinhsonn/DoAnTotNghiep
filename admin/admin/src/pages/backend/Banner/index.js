function Banner() {
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Banner</h1>
           <a className="btn-add" href="banner_create.html">Thêm mới</a>
           <div className="row mt-3 align-items-center">
              <div className="col-6">
                 <ul className="manager">
                    <li><a href="banner_index.html">Tất cả (123)</a></li>
                    <li><a href="#">Xuất bản (12)</a></li>
                    <li><a href="banner_trash.html">Rác (12)</a></li>
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
                    <option value="">Tất cả vị trí</option>
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

           <table className="table table-bordered">
              <thead>
                 <tr>
                    <th className="text-center" style={{width: '30px'}}>
                       <input type="checkbox" id="checkboxAll" />
                    </th>
                    <th className="text-center" style={{width: '130px'}}>Hình ảnh</th>
                    <th>Tên banner</th>
                    <th>Vị trí</th>
                    <th>Liên kết</th>
                    <th className="text-center" style={{width: '30px'}}>ID</th>
                 </tr>
              </thead>
              <tbody>
                 <tr className="datarow">
                    <td className="text-center">
                       <input type="checkbox" />
                    </td>
                    <td>
                       <img src="public/images/banner.jpg" alt="banner.jpg" />
                    </td>
                    <td>
                       <div className="name">
                          <a>
                             Tên banner
                          </a>
                       </div>
                       <div className="function_style">
                          <a href="#" className="text-success mx-1">
                             <i className="fa fa-toggle-on"></i>
                          </a>
                          <a href="banner_edit.html" className="text-primary mx-1">
                             <i className="fa fa-edit"></i>
                          </a>
                          <a href="banner_show.html" className="text-info mx-1">
                             <i className="fa fa-eye"></i>
                          </a>
                          <a href="#" className="text-danger mx-1">
                             <i className="fa fa-trash"></i>
                          </a>
                       </div>
                    </td>
                    <td>vitri</td>
                    <td>lien-ket</td>
                    <td className="text-center">id</td>
                 </tr>
              </tbody>
           </table>

        </section>
     </div>
     );
}

export default Banner;