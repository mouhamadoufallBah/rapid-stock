import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { test } from '../../shared/apiUrl';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit{


  ngOnInit(): void {

  }

  // testC = test

  // increment(){
  //   test.update((val: number) => val+1)
  // }
}
