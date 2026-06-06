package com.example.backend.payment;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.text.DecimalFormat;

@Service
public class PayHereService {

    private final String merchantId;
    private final String merchantSecret;
    private final String notifyBaseUrl;

    public PayHereService(
            @Value("${merchant.id}") String merchantId,
            @Value("${merchant.secret}") String merchantSecret,
            @Value("${payhere.notify.base-url}") String notifyBaseUrl
    ) {
        this.merchantId = merchantId;
        this.merchantSecret = merchantSecret;
        this.notifyBaseUrl = notifyBaseUrl;
    }

    // ==========================
    // GENERATE PAYHERE FORM
    // ==========================
    public String generateCheckoutForm(
            String orderId,
            double amount,
            String returnUrl
    ) {

        String amountFormatted =
                new DecimalFormat("0.00")
                        .format(amount);

        String currency = "LKR";

        String hash =
                generateHash(
                        orderId,
                        amountFormatted,
                        currency
                );

        // DEBUG
        System.out.println("========== PAYHERE DEBUG ==========");
        System.out.println("merchantId = " + merchantId);
        System.out.println("orderId = " + orderId);
        System.out.println("amount = " + amountFormatted);
        System.out.println("currency = " + currency);
        System.out.println("hash = " + hash);
        System.out.println("===================================");

        return """
        <html>
        <body onload="document.forms[0].submit()">

        <form method="post" action="https://sandbox.payhere.lk/pay/checkout">

            <input type="hidden" name="merchant_id" value="%s"/>

            <input type="hidden" name="return_url"
                   value="%s"/>

            <input type="hidden" name="cancel_url"
                   value="%s"/>

            <input type="hidden" name="notify_url"
                   value="%s/api/payment/notify"/>

            <input type="hidden"
                   name="order_id"
                   value="%s"/>

            <input type="hidden"
                   name="items"
                   value="Donation"/>

            <input type="hidden"
                   name="currency"
                   value="%s"/>

            <input type="hidden"
                   name="amount"
                   value="%s"/>

            <input type="hidden"
                   name="first_name"
                   value="User"/>

            <input type="hidden"
                   name="last_name"
                   value="Donor"/>

            <input type="hidden"
                   name="email"
                   value="test@gmail.com"/>

            <input type="hidden"
                   name="phone"
                   value="0771234567"/>

            <input type="hidden"
                   name="address"
                   value="Sri Lanka"/>

            <input type="hidden"
                   name="city"
                   value="Colombo"/>

            <input type="hidden"
                   name="country"
                   value="Sri Lanka"/>

            <input type="hidden"
                   name="hash"
                   value="%s"/>

        </form>

        <h3>Redirecting to PayHere...</h3>

        </body>
        </html>
        """.formatted(
                merchantId,
                returnUrl != null ? returnUrl : "http://localhost:3000/payment-return",
                returnUrl != null ? returnUrl : "http://localhost:3000/payment-return",
                notifyBaseUrl,
                orderId,
                currency,
                amountFormatted,
                hash
        );
    }

    // ==========================
    // HASH GENERATION
    // ==========================
    public String generateHash(
            String orderId,
            String amount,
            String currency
    ) {

        String hashedSecret =
                md5(merchantSecret)
                        .toUpperCase();

        String rawString =
                merchantId +
                        orderId +
                        amount +
                        currency +
                        hashedSecret;

        return md5(rawString)
                .toUpperCase();
    }

    // ==========================
    // VERIFY PAYMENT
    // ==========================
    public boolean verifyPayment(
            String merchantId,
            String orderId,
            String amount,
            String currency,
            String statusCode,
            String md5sig
    ) {

        String hashedSecret =
                md5(merchantSecret)
                        .toUpperCase();

        String localMd5Sig =
                md5(
                        merchantId +
                                orderId +
                                amount +
                                currency +
                                statusCode +
                                hashedSecret
                ).toUpperCase();

        System.out.println("========== VERIFY DEBUG ==========");
        System.out.println("Received md5sig = " + md5sig);
        System.out.println("Generated md5sig = " + localMd5Sig);
        System.out.println("==================================");

        return localMd5Sig.equalsIgnoreCase(md5sig);
    }

    // ==========================
    // MD5 HELPER
    // ==========================
    private String md5(String input) {

        try {

            MessageDigest md =
                    MessageDigest.getInstance("MD5");

            byte[] digest =
                    md.digest(input.getBytes());

            BigInteger no =
                    new BigInteger(1, digest);

            String hash =
                    no.toString(16);

            while (hash.length() < 32) {
                hash = "0" + hash;
            }

            return hash;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}