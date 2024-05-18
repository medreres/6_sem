import { Component } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { UserService } from '../../services/user.service';
import { USER_ID } from '../../../constants';
import { User } from '../../../types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  user: User | undefined;

  ngOnInit(): void {
    this.userService.getUser(USER_ID).subscribe((user) => {
      this.user = user;
    });
  }
}
