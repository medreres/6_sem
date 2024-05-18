package com.banksystem.server.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByCardId(Integer cardId);

    List<Transaction> findByCardIdAndStatus(Integer cardId, TransactionStatus status);
}
