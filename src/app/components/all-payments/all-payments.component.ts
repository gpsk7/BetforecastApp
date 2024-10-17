import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit{
  users: any[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getAllUsers().subscribe((data:any) => {
      this.users = data;
    });
  }
}