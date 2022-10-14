import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements  AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  // eslint-disable-next-line no-unused-vars
  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(res.matches){
       this.sidenav.mode = 'over';
     this.sidenav.close();
    }else {
      this.sidenav.mode = 'side';
      this.sidenav.open();
    }
    });
    }

}
