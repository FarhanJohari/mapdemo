import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import * as _ from 'underscore';

/*
  Generated class for the GoogleApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleApiProvider {

    public link = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    public photoEndpoint = "https://maps.googleapis.com/maps/api/place/photo?"
    public placeIdEndpoint = "https://maps.googleapis.com/maps/api/place/details/json?"
    public distanceMatrixEndpoint = "https://maps.googleapis.com/maps/api/distancematrix/json?"
    public apiKey = "AIzaSyCsuXkWcnsE9tbG-dOTp03IA1qgQNba86U"

    public items = [];
    public distance = [];
    public sortingData : any;
    public dummy: any;

    constructor(public http: Http) {
        console.log('Hello GoogleApiProvider Provider');
    }
    callNearbyPlaces(loc, types){
        this.items = [];
        this.distance = [];
        return new Promise((resolve, reject) =>{

            this.http.get(this.link + "location="+ loc.latitude+","+loc.longitude +"&rankby=distance&types="+ types +"&key=" + this.apiKey)
            .subscribe((data: any) => {
                let parsing = JSON.parse(data._body);
                let parsed = parsing.results;

                parsed.forEach((o, index)  => {
                    this.getDistance(3.11342, 101.57511, o.geometry.location.lat, o.geometry.location.lng).then((response) => {
                        this.distance.push(response);
                    })
                    this.getPlaceDetails(o.place_id).then((response) => {
                        this.dummy = {
                            item : response,
                            distances: this.distance[index]
                        }

                        this.items.push(this.dummy);
                    });
                });
//                console.log(this.itemsPhotos);

                console.log("items distance", this.items);
                resolve(this.items);
            },
            err => {
                console.log(err);
            });
        });

    }
    public sortByKey(arr) {

    }

    getDistance(lat1,lng1, lat2, lng2){
        return new Promise((resolve, reject) =>{
            this.http.get(this.distanceMatrixEndpoint + "units=km&origins="+ lat1 + "," +lng1 +"&destinations="+ lat2 + "," + lng2 +"&key=" + this.apiKey)
            .subscribe((data:any) => {
                let distanceJSON = JSON.parse(data._body);
                resolve(distanceJSON.rows[0].elements[0]);
            },
            err => {
                console.log(err);
            });
        });
    }

//https://maps.googleapis.com/maps/api/distancematrix/json?units=km&origins=3.11342,101.57511&destinations=3.1531523,101.5952371&key=AIzaSyCsuXkWcnsE9tbG-dOTp03IA1qgQNba86U
//
//    getGooglePhoto(photoRef) {
//        return new Promise((resolve, reject) =>{
//            this.http.get(this.photoEndpoint + "photoreference="+ photoRef +"&sensor=false&maxheight=1600&maxwidth=1600&key=" + this.apiKey)
//            .subscribe((data:any) => {
//                let photoJSON = JSON.parse(data._body);
//                resolve(photoJSON.result);
//            },
//            err => {
//                console.log(err);
//            });
//        });
//    }

    getPlaceDetails(placeId) {
        return new Promise((resolve, reject) =>{
            this.http.get(this.placeIdEndpoint + "placeid="+ placeId +"&key=" + this.apiKey)
            .subscribe((data:any) => {
                let placeJSON = JSON.parse(data._body);
                resolve(placeJSON.result);
            },
            err => {
                console.log(err);
            });
        });
    }
}
