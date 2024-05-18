package com.banksystem.server.transaction;

public enum TransactionStatus {

    SUCCESS("success"), FAIL("fail");

    public final String label;

    private TransactionStatus(String label) {
        this.label = label;
    }
}
