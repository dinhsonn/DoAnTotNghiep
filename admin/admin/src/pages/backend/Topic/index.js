function Topic() {
    return (     <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chủ đề bài viết</h1>
       <hr style={{border: 'none'}} />
    </section>
    <section className="content-body my-2">

       <div className="row">
          <div className="col-md-4">
             <div className="mb-3">
                <label><strong>Tên chủ đề (*)</strong></label>
                <input type="text" name="name" className="form-control" placeholder="Tên chủ để"/>
             </div>
             <div className="mb-3">
                <label><strong><strong>Mô tả</strong></strong></label>
                <textarea name="description" rows="6" className="form-control" placeholder="Mô tả"></textarea>
             </div>
             <div className="mb-3">
                <label><strong>Trạng thái</strong></label>
                <select name="status" className="form-control">
                   <option value="1">Xuất bản</option>
                   <option value="2">Chưa xuất bản</option>
                </select>
             </div>
             <div className="mb-3 text-end">
                <button className="btn btn-sm btn-success" type="submit" name="THEM">
                   <i className="fa fa-save"></i> Lưu[Cập nhật]
                </button>
             </div>
          </div>
          <div className="col-md-8">
             <div className="row mt-3 align-items-center">
                <div className="col-12">
                   <ul className="manager">
                      <li><a href="brand_index.html">Tất cả (123)</a></li>
                      <li><a href="#">Xuất bản (12)</a></li>
                      <li><a href="brand_trash.html">Rác (12)</a></li>
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
             <table className="table table-bordered">
                <thead>
                   <tr>
                      <th className="text-center" style={{width: '30px'}}>
                         <input type="checkbox" id="checkboxAll" />
                      </th>
                      <th>Tên chủ đề</th>
                      <th>Tên slug</th>
                      <th className="text-center" style={{width: '30px'}}>ID</th>
                   </tr>
                </thead>
                <tbody>
                   <tr className="datarow">
                      <td>
                         <input type="checkbox" id="checkId" />
                      </td>
                      <td>
                         <div className="name">
                            <a href="topic_edit.html">
                               Tên chủ đề
                            </a>
                         </div>
                         <div className="function_style">
                            <a href="#" className="text-success mx-1">
                               <i className="fa fa-toggle-on"></i>
                            </a>
                            <a href="topic_edit.html" className="text-primary mx-1">
                               <i className="fa fa-edit"></i>
                            </a>
                            <a href="topic_show.html" className="text-info mx-1">
                               <i className="fa fa-eye"></i>
                            </a>
                            <a href="#" className="text-danger mx-1">
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
 </div> );
}

export default Topic;