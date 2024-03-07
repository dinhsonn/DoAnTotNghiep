function Category() {
    return (  
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Danh mục</h1>
           <hr style={{border: 'none'}} />
        </section>
        <section className="content-body my-2">

           <div className="row">
              <div className="col-md-4">
                 <div className="mb-3">
                    <label>
                       <strong>Tên danh mục (*)</strong>
                    </label>
                    <input type="text" name="name" id="name" placeholder="Nhập tên danh mục"
                       className="form-control" required/>
                 </div>
                 <div className="mb-3">
                    <label><strong>Mô tả</strong></label>
                    <textarea name="description" placeholder="Mô tả" rows="4" className="form-control"></textarea>
                 </div>
                 <div className="mb-3">
                    <label><strong>Danh mục cha</strong></label>
                    <select name="parent_id" className="form-select">
                       <option value="0">None</option>
                       <option value="1">Tên danh mục</option>
                    </select>
                 </div>
                 <div className="mb-3">
                    <label><strong>Hình đại diện</strong></label>
                    <input type="file" name="image" className="form-control"/>
                 </div>
                 <div className="mb-3">
                    <label><strong>Trạng thái</strong></label>
                    <select name="status" className="form-select">
                       <option value="1">Xuất bản</option>
                       <option value="2">Chưa xuất bản</option>
                    </select>
                 </div>
                 <div className="mb-3 text-end">
                    <button type="submit" className="btn btn-success" name="THEM">
                       <i className="fa fa-save"></i> Lưu[Thêm]
                    </button>
                 </div>
              </div>
              <div className="col-md-8">
                 <div className="row mt-3 align-items-center">
                    <div className="col-12">
                       <ul className="manager">
                          <li><a href="category_index.html">Tất cả (123)</a></li>
                          <li><a href="#">Xuất bản (12)</a></li>
                          <li><a href="category_trash.html">Rác (12)</a></li>
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
                       <button className="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                 </div>
                 <table className="table table-bordered">
                    <thead>
                       <tr>
                          <th className="text-center" style={{width: '30px'}}>
                             <input type="checkbox" id="checkboxAll" />
                          </th>
                          <th className="text-center" style={{width: '90px'}}>Hình ảnh</th>
                          <th>Tên danh mục</th>
                          <th>Tên slug</th>
                          <th className="text-center" style={{width: '30px'}}>ID</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr className="datarow">
                          <td className="text-center">
                             <input type="checkbox" id="checkId" />
                          </td>
                          <td>
                             <img className="img-fluid" src="public/images/category.jpg" alt="category.jpg"/>
                          </td>
                          <td>
                             <div className="name">
                                <a href="category_index.html">
                                   Tên danh mục
                                </a>
                             </div>
                             <div className="function_style">
                                <a href="#" className="px-1 text-success">
                                   <i className="fa fa-toggle-on"></i>
                                </a>
                                <a href="category_edit.html" className="px-1 text-primary">
                                   <i className="fa fa-edit"></i>
                                </a>
                                <a href="category_show.html" className="px-1 text-info">
                                   <i className="fa fa-eye"></i>
                                </a>
                                <a href="#" className="px-1 text-danger">
                                   <i className="fa fa-trash"></i>
                                </a>
                             </div>
                          </td>
                          <td>Slug</td>
                          <td className="text-center">1</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

        </section>
     </div>
    );
}

export default Category;