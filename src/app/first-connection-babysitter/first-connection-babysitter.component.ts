import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-connection-babysitter',
  templateUrl: './first-connection-babysitter.component.html',
  styleUrls: ['./first-connection-babysitter.component.css']
})
export class FirstConnectionBabysitterComponent implements OnInit {
  public returnError = false;
  constructor() { }

  ngOnInit(): void {
  }
  closeAlert() {
    this.returnError = false;
  }
}
