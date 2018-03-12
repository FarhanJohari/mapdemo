import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-set-emergency',
  templateUrl: 'set-emergency.html',
})
export class SetEmergencyPage {
    public message: any;
    public title: any;
    public buttonOk: any;
    public buttonCancel: any;
    public value: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer, public viewCtrl: ViewController) {
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
        this.message = navParams.get('message');
        this.title = navParams.get('title');
        this.buttonOk = navParams.get('buttonOk');
        this.buttonCancel = navParams.get('buttonCancel');
        this.value = navParams.get('value');
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SlotModalPage');
    }

    buttonOKCall(val) {
        let data = {
            'value': val
        };
        this.viewCtrl.dismiss(data);
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
    actionGoToMap() {
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot('MapPage', {}, {animate: true, direction: 'forward'})
    }
}
