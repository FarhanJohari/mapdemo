import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Injectable } from '@angular/core';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeAudio } from '@ionic-native/native-audio';
import { ActionSheetController } from 'ionic-angular'
import { PhotoViewer } from '@ionic-native/photo-viewer';
/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {

    map: GoogleMap;

    public curImg: any;
    public img: any;


    constructor(public nativeGeocoder: NativeGeocoder, public geolocation: Geolocation, public nativeAudio: NativeAudio, public camera: Camera, public actionSheetCtrl: ActionSheetController, public photoViewer: PhotoViewer) {
        console.log('Hello UtilitiesProvider Provider');

    }

    getCurrentCoordinate(){
        return new Promise((resolve, reject) =>{
            this.geolocation.getCurrentPosition().then((resp) => {
                resolve(resp);
            }).catch((error) => {
              console.log('Error getting location', error);
            });
        });
    }

    reverseGeocode(lat, long){
        return new Promise((resolve, reject) =>{
            this.nativeGeocoder.reverseGeocode(lat, long).then((result: NativeGeocoderReverseResult) => {
                console.log(result);
                resolve(result);
            }).catch((error: any) => console.log(error));
        });
    }
    playAudio(){
        return new Promise((resolve, reject) =>{
            this.nativeAudio.play('siren', () =>{
                this.nativeAudio.loop('siren');
            });
        });
    }

    stopAudio(){
        return new Promise((resolve, reject) =>{
            this.nativeAudio.stop('siren');
        });
    }

    callAudio() {
        this.nativeAudio.preloadComplex('siren', 'assets/sound/siren.mp3', 1, 1, 0).then(() =>{
//            this.playAudio();
        });
    }


    captureImg(){
        return new Promise((resolve, reject) =>{
                const options : CameraOptions = {
                quality: 80, // picture quality
                allowEdit: true,
                correctOrientation : true,
                targetWidth: 400,
                targetHeight: 400,
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }
            this.camera.getPicture(options).then((imageData) => {

                this.img = imageData;
//                let image = this.file.resolveLocalFilesystemUrl(imageData);
//                this.finalName(image);
//                console.log("names", image);
                resolve(this.img);
//                this.photos.push(this.base64Image);
//                this.photos.reverse();
            }, (err) => {
                reject(err);
            });
        });
    }

    presentActionSheetNewPhoto() {
        return new Promise((resolve, reject) =>{
            let actionSheet = this.actionSheetCtrl.create({
            title: 'Add Photo from gallery or camera',
            buttons: [
                {
                    text: 'Open Gallery',
                    role: 'destructive',
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.captureImg().then((result) => {
                            this.curImg = result;
                            resolve(result);
                        }).catch((err) =>{
                            console.log(err);
                            reject(err);
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
            });
            actionSheet.present();
        });
    }

    presentActionSheetOldPhoto() {
        return new Promise((resolve, reject) =>{
            let actionSheet = this.actionSheetCtrl.create({
            title: 'Add Photo from gallery or camera',
            buttons: [
                {
                    text: 'View Profile Image',
                    handler: () => {
                        this.viewImage(this.curImg, "Profile Image");
                    }
                },
                {
                    text: 'Open Gallery',
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.captureImg().then((result) => {
                            this.curImg = result;
                            resolve(result);
                        }).catch((err) =>{
                            console.log(err);
                            reject(err);
                        });
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
            });
            actionSheet.present();
        });
    }

    viewImage(imgPath, title){
        return new Promise((resolve, reject) =>{
            this.photoViewer.show(imgPath, title, {share: false});
        });
    }
}
