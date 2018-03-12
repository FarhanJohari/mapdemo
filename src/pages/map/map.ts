import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 MyLocation
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities'

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
    map: GoogleMap;
    mapReady: boolean = false;

    constructor(public navCtrl: NavController) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad');
        this.loadMap();
    }

    loadMap() {
        this.map = GoogleMaps.create('map_canvas');
        console.log("map no running");
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {console.log('Map is ready!')});
    }
}
