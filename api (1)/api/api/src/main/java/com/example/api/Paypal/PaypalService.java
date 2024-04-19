package com.example.api.Paypal;

import java.math.BigDecimal;
import java.math.RoundingMode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Item;
import com.paypal.api.payments.ItemList;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

@Service
public class PaypalService {

    @Autowired
    private APIContext apiContext;
    public Payment createPayment(Payments payment, String cancelUrl, String successUrl) throws PayPalRESTException {
        // Khởi tạo danh sách các mặt hàng (items)
        List<Item> items = new ArrayList<>();
        
        BigDecimal itemTotal = new BigDecimal(payment.getAmount()).setScale(2, RoundingMode.HALF_UP);
        int quantity = Integer.parseInt(payment.getQuantity());
        itemTotal = itemTotal.multiply(BigDecimal.valueOf(quantity)).setScale(2, RoundingMode.HALF_UP);
    
        BigDecimal totalBigDecimal = new BigDecimal(itemTotal.doubleValue()).setScale(2, RoundingMode.HALF_UP);
    
        Item item = new Item();
        item.setName(payment.getIdProduct());
        item.setCurrency(payment.getCurrency());
        item.setPrice(totalBigDecimal.toString());
        item.setQuantity(payment.getQuantity());
        item.setDescription(payment.getDescription());
        items.add(item);
    
        ItemList itemList = new ItemList();
        itemList.setItems(items);
    
        Amount totalAmountObj = new Amount();
        totalAmountObj.setCurrency(payment.getCurrency());
        totalAmountObj.setTotal(totalBigDecimal.toString());
    
        Transaction totalTransaction = new Transaction();
        totalTransaction.setItemList(itemList);
        totalTransaction.setDescription(payment.getDescription());
        totalTransaction.setAmount(totalAmountObj);
    
        Payer payer = new Payer();
        payer.setPaymentMethod(payment.getMethod());
        payer.setStatus(payment.getStatus());
    
        Payment paypalPayment = new Payment();
        paypalPayment.setIntent(payment.getIntent());
        paypalPayment.setPayer(payer);
        paypalPayment.setTransactions(Collections.singletonList(totalTransaction));
    
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
    
        paypalPayment.setRedirectUrls(redirectUrls);
        apiContext.setMaskRequestId(true);
    
        return paypalPayment.create(apiContext);
    }
    

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);

        return payment.execute(apiContext, paymentExecute);
    }

}
