import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ROUTER_GROUPS } from '../../app-routing.module';
import { Router } from '@angular/router';
import {AuthService} from '../../modules/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Output() selectItem: EventEmitter<any>;
  fixedSideBarMd = false;
  routerGroups = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.fixedSideBarMd = window.pageYOffset > 60;
  }
  constructor(private router: Router, private authService: AuthService) {
    this.selectItem = new EventEmitter();
  }

  ngOnInit() {
    this.routerGroups = Object.values(ROUTER_GROUPS);
    this.onWindowScroll();
  }

  onSelectRoute() {
    this.selectItem.emit();
  }

  isSelected(url: string[]) {
    return this.router.isActive(this.router.createUrlTree(url), false);
  }
  canAccess(data): boolean {
    return this.authService.canAccessThisRoute(data);
  }
}
