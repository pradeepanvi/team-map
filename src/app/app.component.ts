import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'My first AGM project';
  markerData:any;
  mapData:any;

  lat: number = 51.5135225;
  lng: number = -0.12687700000003588;
  updateM: number;
  iconUrl: string = 'assets/blue_marker.png'
  iconUrl2: string = 'assets/orange_marker.png'

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.http.get('http://team-scale.com/TestData/ng_text_v15/api').subscribe(
      (res) => {
        this.mapData = res;
        this.markerData = res;
        console.log(res);
      }
    )
  }

  clickedMarker(index: number) {
    if(this.updateM != index){
      this.mapData = [];
      this.mapData.push(this.markerData[index]);
      this.updateM = index;
    } else {
      this.mapData = this.markerData;
    }
  }
}
