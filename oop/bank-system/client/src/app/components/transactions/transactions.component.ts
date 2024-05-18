import { Component, Input } from '@angular/core';
import { Transaction } from '../../../types';
import { CommonModule, NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [NgFor, CardModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  @Input() transactions!: Transaction[];
}
