import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {AuthService} from '../../modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() clickMenuButton: EventEmitter<any>;
  headerAction = 1;
  constructor(
      public authService: AuthService,
  ) {
    this.clickMenuButton = new EventEmitter();
  }

  ngOnInit() {
  }

  triggerBtn() {
    this.clickMenuButton.emit();
  }

}
