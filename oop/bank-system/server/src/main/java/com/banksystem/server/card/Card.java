package com.banksystem.server.card;

import com.banksystem.server.transaction.Transaction;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cards")
public class Card {

    public Card() {
    }

    public Card(String cardNumber, Integer userId) {
        this.cardNumber = cardNumber;
        this.userId = userId;
    }


    public Card(Integer id, String cardNumber) {
        this.cardNumber = cardNumber;
        this.id = id;
    }
    @Id
    @SequenceGenerator(
            name = "card_sequence",
            sequenceName = "card_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "card_sequence"
    )
    private Integer id;
    private String cardNumber;

    private Integer userId;

    @OneToMany(targetEntity = Transaction.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "cardId", referencedColumnName = "id")
    private List<Transaction> transactions;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

}
