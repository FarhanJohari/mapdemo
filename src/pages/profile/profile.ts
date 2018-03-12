import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilitiesProvider } from '../../providers/utilities/utilities';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

    public image : any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public u: UtilitiesProvider) {
    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad ProfilePage');
    }

    actionGotoPhoto() {
        this.navCtrl.push("ReportPhotoPage");
    }

    actionTakePhoto(){
        if(!this.image){
            this.u.presentActionSheetNewPhoto().then((res:any) => {
                this.image = res;
            }).catch((err) =>{
                console.log(err);
            })
        }
        else {
            this.u.presentActionSheetOldPhoto().then((res:any) => {
                this.image = res;
            }).catch((err) =>{
                console.log(err);
            })
        }

    }

}
