function ProductTrash() {
    return (   <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Thùng rác sản phẩm</h1>
       <div className="row mt-3 align-items-center">
          <div className="col-6">
             <ul className="manager">
                <li><a href="product_index.html">Tất cả (123)</a></li>
                <li><a href="#">Xuất bản (12)</a></li>
                <li><a href="product_trash.html">Rác (12)</a></li>
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

       <table className="table table-bordered">
          <thead>
             <tr>
                <th className="text-center" style={{width: '30px'}}>
                   <input type="checkbox" id="checkboxAll" />
                </th>
                <th className="text-center" style={{width: '130px'}}>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Tên danh mục</th>
                <th>Tên thương hiệu</th>
                <th className="text-center" style={{width: '30px'}}>ID</th>
             </tr>
          </thead>
          <tbody>
             <tr className="datarow">
                <td>
                   <input type="checkbox" id="checkId" />
                </td>
                <td>
                   <img className="img-fluid" src="public/images/product.jpg" alt="product.jpg"/>
                </td>
                <td>
                   <div className="name">
                      <a href="product_edit.html">
                         Tên sản phẩm
                      </a>
                   </div>
                   <div className="function_style">
                      <a href="#" className="btn btn-primary btn-sm">
                         <i className="fa fa-undo"></i>
                      </a>
                      <a href="#" className="btn btn-danger btn-sm">
                         <i className="fa fa-trash"></i>
                      </a>
                   </div>
                </td>
                <td>Tên danh mục</td>
                <td>Tên Thuong hiệu</td>
                <td className="text-center">1</td>
             </tr>
          </tbody>
       </table>

    </section>
 </div> );
}

export default ProductTrash;