package com.banksystem.server.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("{cardId}")
    public List<Transaction> getTransactions(@PathVariable("cardId") Integer cardId) {
        return this.transactionService.getTransactionsByCardId(cardId);
    }

    @PostMapping("{cardId}")
    public Transaction createTransaction(@RequestBody Transaction transaction, @PathVariable("cardId") Integer cardId) {
        return this.transactionService.createTransaction(transaction.amountInCents, cardId);
    }
}
