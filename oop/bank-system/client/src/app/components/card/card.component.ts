import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

import { Card } from '../../../types';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card: Card | undefined;
  @Input() balance!: number;
  @Input() onDeposit!: (amountInCents: number) => void;
  @Input() onWithdrawal!: (amountInCents: number) => void;

  amount: number | undefined; // Property to store input value

  depositHandler() {
    this.onDeposit(this.amount || 0);
  }
  withdrawHandler() {
    this.onWithdrawal(this.amount || 0);
  }
}
