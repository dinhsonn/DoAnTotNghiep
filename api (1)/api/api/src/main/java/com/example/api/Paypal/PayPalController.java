package com.example.api.Paypal;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
@RestController
@RequestMapping("/paypal")
public class PayPalController {
    private static final Logger log = LoggerFactory.getLogger(PayPalController.class);

    @Autowired
    private paymentInfoRepository paymentInfoRepository;

    @GetMapping
    public List<PaymentInfo> getAllUsers() {
        try {
            List<PaymentInfo> paymentInfoList = paymentInfoRepository.findAll();
            
            log.info("Retrieved paymentInfoList: {}", paymentInfoList);

            return paymentInfoList;
        } catch (Exception e) {
            log.error("Error while fetching paymentInfoList", e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable Long id) {
        try {
            PaymentInfo existingCategory = paymentInfoRepository.findById(id)
                    .orElse(null);

            if (existingCategory == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Category not found with id " + id));
            }

            // Lưu thông tin sản phẩm đã xóa
            Map<String, Object> response = new HashMap<>();
            response.put("id", existingCategory.getId()); // Đưa ID của sản phẩm vào phản hồi
            response.put("message", "Category deleted successfully");

            // Xóa sản phẩm từ cơ sở dữ liệu
            paymentInfoRepository.delete(existingCategory);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Xử lý nếu có lỗi xảy ra trong quá trình xóa
            log.error("Failed to delete category", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Failed to delete category"));
        }
    }
}
