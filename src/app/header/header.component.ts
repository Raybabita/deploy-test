import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('sellerData') && val.url.includes('seller')) {
          console.log('In seller area')
          this.menuType = 'sellerData';
          if (localStorage.getItem('sellerData')) {
            let sellerStore = localStorage.getItem('sellerData');
            let parsedSellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = parsedSellerData.name;
          }
        } else {
          console.log('outside seller area')
          this.menuType = 'default';
        }
      }
    })
  }

  logout() {
    localStorage.removeItem("sellerData");
    this.route.navigate(['/'])
  }

}
