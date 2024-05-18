package com.banksystem.server.transaction;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {
    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }

    @Id
    @SequenceGenerator(name = "transaction_sequence", sequenceName = "transaction_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "transaction_sequence")
    Integer id;
    Long amountInCents;
    TransactionStatus status;
    private Integer cardId;

    public Transaction(Long amountInCents, Integer cardId) {
        this.amountInCents = amountInCents;
        this.cardId = cardId;
    }

    public Transaction() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getAmountInCents() {
        return amountInCents;
    }

    public void setAmountInCents(Long amountInCents) {
        this.amountInCents = amountInCents;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public void setStatus(TransactionStatus status) {
        this.status = status;
    }

    public Integer getCardId() {
        return cardId;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", amountInCents='" + amountInCents + '\'' +
                ", status='" + status + '\'' +
                ", cardId='" + cardId + '\'' +
                '}';
    }
}
