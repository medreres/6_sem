package com.banksystem.server.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getTransactionsByCardId(Integer cardId) {
        return this.transactionRepository.findByCardId(cardId);
    }

    public List<Transaction> getSuccessfulTransactions(Integer cardId) {
        return this.transactionRepository.findByCardIdAndStatus(cardId, TransactionStatus.SUCCESS);
    }

    public Transaction createTransaction(Long amountInCents, Integer cardId) {
        var newTransaction = new Transaction(amountInCents, cardId);

        if (amountInCents >= 0) {
            newTransaction.setStatus(TransactionStatus.SUCCESS);
        } else {
            var transactions = this.getSuccessfulTransactions(cardId);
            System.out.println(transactions.toString());

            Long cardBalance = transactions.stream()
                    .mapToLong(Transaction::getAmountInCents) // Map Transaction objects to their amountInCents
                    .sum(); // Sum the amountInCents using IntStream sum method

            Boolean canWithdraw = Math.abs(amountInCents) <= cardBalance;

            System.out.println("amount in cents abs " + Math.abs(amountInCents));
            System.out.println("card balance" + cardBalance);

            newTransaction.setStatus(canWithdraw ? TransactionStatus.SUCCESS
                    : TransactionStatus.FAIL);
        }

        return this.transactionRepository.save(newTransaction);

    }
}
