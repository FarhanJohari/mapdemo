import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleApiProvider } from '../../providers/google-api/google-api';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
/**
 * Generated class for the NearbyStationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nearby-station',
  templateUrl: 'nearby-station.html',
})
export class NearbyStationPage {

    public items: any;
    public distance: any;
    public title: any;
    public index : any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public googleProvider: GoogleApiProvider, public u : UtilitiesProvider) {
        this.title = navParams.get('title');
        this.index = navParams.get('index');
    }

  ionViewDidLoad() {
      console.log(this.navParams.get('type'));
      this.u.getCurrentCoordinate().then((resp:any) => {
            console.log(resp);
             this.googleProvider.callNearbyPlaces(resp.coords, this.navParams.get('type')).then((res: any) => {
                this.items = res;
            }).catch((err) => {

            })
      })

    console.log('ionViewDidLoad NearbyStationPage');
  }

}
