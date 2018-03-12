import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
    public play: boolean = false;
    public curAddress: any;
    public types = ['hospital','police','fire_station','doctor']
    public titles = ['Nearby Hospital','Nearby Police Station','Nearby Fire Station','Nearby Clinic']

    constructor(public navCtrl: NavController, public navParams: NavParams, public u : UtilitiesProvider, public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        this.u.callAudio();
        this.u.getCurrentCoordinate().then((res: any) => {
            console.log(res);
            this.u.reverseGeocode(res.coords.latitude, res.coords.longitude).then((result :any) => {
        //            console.log(result);
                this.curAddress = result[0].thoroughfare + ", " + result[0].subLocality + ", " + result[0].postalCode + ", " + result[0].locality + ", " + result[0].administrativeArea;
            })
        })
    }

    actionPlaySiren(){
        this.play = !this.play;

        // CHANGE THE NAME OF THE BUTTON.
        if(this.play){
            this.u.playAudio();
            console.log("Play Sound");
        }
        else {
            this.u.stopAudio();
            console.log("Stop Sound");
        }
    }

    actionModalSetOff() {
        let setEmergency = this.modalCtrl.create('SetEmergencyPage');
        setEmergency.present();
    }

    actionBenefit() {
        this.navCtrl.push('BenefitPage');
    }

    actionGoToProfile(){
        this.navCtrl.push('ProfilePage');
    }

    actionGoToNearby(val) {
        this.navCtrl.push('NearbyStationPage', {
            type: this.types[val],
            title: this.titles[val],
            index: val
        });
    }


}
