import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // eventSource = [];
  // timeRange: string;
  showCalendar: boolean = true;
  selectedDate = new Date();
  beginDate: string;
  endDate: string;
  weekNumber: number;
  calendar = {
    mode: 'month',
    currentDate: this.selectedDate
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.weekNumber = moment(this.selectedDate).isoWeek();
    this.setDateBeginEnd();
  }

  // addEvent() {
  //   let modal = this.modalCtrl.create('EventModalPage', {selectedDate: this.selectedDate});
  //   modal.present();
  //   modal.onDidDismiss(data => {
  //     if (data) {
  //       let eventData = data;

  //       eventData.startTime = new Date(data.startTime);
  //       eventData.endTime = new Date(data.endTime);

  //       let events = this.eventSource;
  //       events.push(eventData);
  //       this.eventSource = [];
  //       setTimeout(() => {
  //         this.eventSource = events;
  //       });
  //     }
  //   });
  // }
  setDateBeginEnd() {
    var _beginDate = new Date(this.selectedDate);
    var _endDate = new Date(this.selectedDate);
    _beginDate.setDate(- this.selectedDate.getUTCDay() + this.selectedDate.getDate());
    _endDate.setDate(6 - this.selectedDate.getUTCDay() + this.selectedDate.getDate());
    this.beginDate = moment(_beginDate).format('D.M.YYYY');
    this.endDate = moment(_endDate).format('D.M.YYYY');
  }

  onViewDidLoad() {

  }

  modifyWeek(weeksRange) {
    this.calendar.currentDate.setDate(this.calendar.currentDate.getDate() + weeksRange * 7);
    // this.onViewTitleChanged(null);
    this.weekNumber = moment(this.selectedDate).isoWeek();
    this.setDateBeginEnd();
  }

  toggleCalendar() {
    console.log("toggle");
    this.showCalendar = (this.showCalendar) ? false : true;
  }

  onViewTitleChanged(title) {

    // this.timeRange = this.calendar.currentDate.toLocaleDateString();
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDate = ev.selectedTime;
  }
}