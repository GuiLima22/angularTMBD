import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { API_IMG } from '../../../environments/environments.prod';
import { ActivatedRoute } from '@angular/router';
import { GetMovieService } from '../../services/get-movie.service';
import { Subscription } from 'rxjs';
import { EstablishComunicationService } from '../../services/establish-comunication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnChanges {

  data: any = false;
  title: any = false;

  imageUrl: string = API_IMG;

  private subscription: Subscription;

  parametroDaUrl: any;

  constructor(private route: ActivatedRoute, private getMovieService: GetMovieService, private establishComunication: EstablishComunicationService) {
    this.subscription = this.establishComunication.establish.subscribe(() => {
      setTimeout(() => {
        if (JSON.stringify(this.data) !== JSON.stringify(this.establishComunication.data)) {
          this.data = [];
          this.data = this.establishComunication.data
          this.title = this.parametroDaUrl
        }
      }, 300)
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (q: any) => { this.parametroDaUrl = q["q"] }
    )
    setTimeout(() => {
      this.data = this.establishComunication.data
      this.title = this.parametroDaUrl
    }, 300)
  }

  ngOnChanges() {
    console.log('teste')
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
