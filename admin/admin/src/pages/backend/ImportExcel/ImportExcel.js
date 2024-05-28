import React, { useState } from "react";
import { read, utils } from "xlsx";
import ProductService from "../../../services/ProductServices";

function ImportExcel() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImport = async () => {
    if (!file) {
      alert("Vui lòng chọn một tệp Excel.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

      // Chỉ lấy dòng dữ liệu đầu tiên từ tệp Excel, giả sử đây là thông tin của một sản phẩm
      const productData = jsonData[0];

      try {
        // Gửi dữ liệu đến API để tạo một sản phẩm mới
        const response = await ProductService.create(productData);
        console.log("Imported successfully:", response);
        alert("Dữ liệu đã được nhập thành công.");
      } catch (error) {
        console.error("Error importing data:", error);
        alert("Đã xảy ra lỗi khi nhập dữ liệu.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Import từ Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleImport}>Import</button>
    </div>
  );
}

export default ImportExcel;
