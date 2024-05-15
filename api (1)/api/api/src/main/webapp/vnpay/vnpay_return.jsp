<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>VNPAY Return Page</title>
</head>
<body>
    <h1>VNPAY Return Page</h1>
    <%-- Lấy các tham số từ URL --%>
    <% String vnpAmount = request.getParameter("vnp_Amount"); %>
    <% String vnpBankCode = request.getParameter("vnp_BankCode"); %>
    <% String vnpOrderInfo = request.getParameter("vnp_OrderInfo"); %>
    <% String vnpResponseCode = request.getParameter("vnp_ResponseCode"); %>
    
    <%-- Hiển thị thông tin --%>
    <p>Amount: <%= vnpAmount %></p>
    <p>Bank Code: <%= vnpBankCode %></p>
    <p>Order Info: <%= vnpOrderInfo %></p>
    <p>Response Code: <%= vnpResponseCode %></p>
</body>
</html>
