import { Component, OnInit } from '@angular/core';
import { TransactionsComponent } from '../components/transactions/transactions.component';
import { Card, Transaction, TransactionStatus } from '../../types';
import { UserComponent } from '../components/user/user.component';
import { CardComponent } from '../components/card/card.component';
import { CardService } from '../services/card.service';
import { USER_ID } from '../../constants';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserComponent, CardComponent, TransactionsComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private transactionService: TransactionService
  ) {}
  card: Card | undefined;
  transactions: Transaction[] = [];
  balance: number = 0;

  handleDeposit(amountInCents: number): void {
    this.transactionService
      .makeTransaction({
        cardId: this.card!.id,
        amountInCents: amountInCents! * 100,
      })
      .subscribe({
        next: (response) => {
          this.fetchTransactions(response.cardId);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  handleWithdrawal(amountInCents: number): void {
    this.transactionService
      .makeTransaction({
        cardId: this.card!.id,
        amountInCents: -(amountInCents! * 100),
      })
      .subscribe({
        next: (response) => {
          this.fetchTransactions(response.cardId);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit(): void {
    this.cardService.getCards(USER_ID).subscribe((cards) => {
      const [card] = cards;
      this.card = card;

      this.fetchTransactions(card.id);
    });
  }

  private fetchTransactions(cardId: number) {
    this.transactionService
      .getTransactionsByCardId(cardId)
      .subscribe((transactions) => {
        this.transactions = transactions;

        const total = transactions
          .filter(
            (transaction) => transaction.status === TransactionStatus.SUCCESS
          )
          .reduce((total, transaction) => total + transaction.amountInCents, 0);
        this.balance = Number((total / 100).toFixed(2));
      });
  }
}
