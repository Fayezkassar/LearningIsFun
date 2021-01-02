import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {
  @Input() name: string;
  @Input() lastName: string;
  @Input() phoneNumber : string;
  @Input() email: string;
  @Input() course: string;
  @Input() hoursNeeded: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
