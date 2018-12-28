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
  radiusData:any;

  lat: number = 51.5135225;
  lng: number = -0.12687700000003588;

  radius: number;

  lat2: number = 51.5073509;
  lng2: number = -0.12775829999998223;

  updateM: number;
  updateL: number;
  iconUrl: string = 'assets/blue_marker.png'
  iconUrl2: string = 'assets/orange_marker.png';

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.http.get('http://team-scale.com/TestData/ng_text_v15/api').subscribe(
      (res) => {
        this.mapData = res;
        this.markerData = res;
        this.radiusData = res;
        console.log(res);
        for(var i=0; i<this.markerData.length; i++){
          this.markerData[i].iconUrl = this.iconUrl;
        }
      }
    )
  }

  listclicked(index){
    for(var i=0; i<this.markerData.length; i++){
      this.markerData[i].iconUrl = this.iconUrl;
    }
    if(this.updateL != index){
      this.markerData[index].iconUrl = this.iconUrl2;
    }
  }

  clickedMarker($event, index: number) {
    for(var i=0; i<this.markerData.length; i++){
      this.markerData[i].iconUrl = this.iconUrl;
    }
    if(this.updateM != index){
      this.mapData = [];
      this.mapData.push(this.markerData[index]);
      this.updateM = index;
      this.markerData[index].iconUrl = this.iconUrl2;
    } else {
      this.mapData = this.markerData;
    }
  }

  radiusChnage($event){
    this.radius = $event;
  }
  dragEnd($event){
    this.mapData = [];
    this.markerData = [];
    for(var i=0; i<this.radiusData.length; i++){
      if($event.coords.lat + (this.radius / (this.radius * this.radius)) + (this.radius / (this.radius * this.radius)) > this.radiusData[i].lat && $event.coords.lng + (this.radius / (this.radius * this.radius)) + (this.radius / (this.radius * this.radius)) > this.radiusData[i].lon){
        this.mapData.push(this.radiusData[i]);
        this.markerData.push(this.radiusData[i]);
      }
    }
  }
}
