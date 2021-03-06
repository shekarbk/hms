import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class HmsService {
  rootUrl = "http://localhost:3000/"; //NOTE: used for json server
  //rootAPIUrl = "http://localhost:8090/v1/hms/"; //NOTE: moved to global constants

  constructor(private httpInstance: HttpClient) { }

  getLoginUserDetails(email, pass, role) {
    return this.httpInstance.get(`${this.rootUrl}profile?email=${email}&password=${pass}&role=${role}`);
  }

  getLoginUserDetailsAPI(data) {
    return this.httpInstance.post(GlobalConstants.rootAPIUrl + "authenticate", data);
  }

  getLoginUserDetailsAPIFunction(data) {    
    this.httpInstance.post(GlobalConstants.rootAPIUrl + "authenticate", data).subscribe((result) => {
      return result;
    });
  }


  createProfile(data) {
    return this.httpInstance.post(this.rootUrl + "profile", data);
  }

  deleteProfile(id) {
    return this.httpInstance.delete(`${this.rootUrl}profile/${id}`);
  }

  saveRegistration(data) {
    return this.httpInstance.post(this.rootUrl + "registration", data);
  }

  saveRegistrationAPI(data) {
    return this.httpInstance.post(GlobalConstants.rootAPIUrl + "registration", data);
  }

  updateRegistration(id, data) {
    return this.httpInstance.put(`${this.rootUrl}registration/${id}`, data);
  }

  updateRegistrationAPI(data) {
    return this.httpInstance.put(`${GlobalConstants.rootAPIUrl}registration`, data);
  }

  getRegistrationDetails(id) {
    return this.httpInstance.get(`${this.rootUrl}registration/?id=${id}`);
  }

  getRegistrationDetailsAPI(id) {
    return this.httpInstance.get(`${GlobalConstants.rootAPIUrl}registration/${id}`);
  }

  deleteRegistrationDetails(id) {
    return this.httpInstance.delete(`${this.rootUrl}registration/${id}`);
  }

  deleteRegistrationDetailsAPI(id) {
    return this.httpInstance.delete(`${GlobalConstants.rootAPIUrl}registration/${id}`);
  }

  cancelAppointment(id) {
    return this.httpInstance.delete(`${this.rootUrl}booking/${id}`);
  }

  cancelAppointmentAPI(id) {
    return this.httpInstance.delete(`${GlobalConstants.rootAPIUrl}booking/${id}`);
  }

  listAppointments() {

  }

  getBookingDetails(doctorId, date) {
    return this.httpInstance.get(`${this.rootUrl}booking/?doctorId=${doctorId}&bookedDate=${date}`);
  }

  async getAsyncBookingDetails(doctorId, date) {
    return await this.httpInstance.get(`${this.rootUrl}booking/?doctorId=${doctorId}&bookedDate=${date}`).toPromise();
  }

  saveBookingDetails(data) {
    return this.httpInstance.post(this.rootUrl + "booking", data);
  }

  saveBookingDetailsAPI(data) {
    return this.httpInstance.post(GlobalConstants.rootAPIUrl + "booking", data);
  }

  getBookingSummaryDetails(id) {
    return this.httpInstance.get(`${this.rootUrl}booking/?id=${id}`);
  }

  getBookingSummaryDetailsAPI(id) {
    return this.httpInstance.get(`${GlobalConstants.rootAPIUrl}booking/${id}`);
  }

  getAppointmentDetails(queryDate) {
    return this.httpInstance.get(`${this.rootUrl}booking/?bookedDate=${queryDate}`);
  }

  getAppointmentDetailsAPI(queryDate) {
    return this.httpInstance.get(`${GlobalConstants.rootAPIUrl}booking/date/${queryDate}`);
  }

  updatebookingDetails(id, data) {
    return this.httpInstance.put(`${this.rootUrl}booking/${id}`, data);
  }

  updatebookingDetailsAPI(data) {
    return this.httpInstance.put(`${GlobalConstants.rootAPIUrl}booking`, data);
  }

  getAllBookingDetails() {
    return this.httpInstance.get(`${this.rootUrl}booking`);
  }

  getAllBookingDetailsAPI() {
    return this.httpInstance.get(`${GlobalConstants.rootAPIUrl}booking/`);
  }

  getAllProfileDetails(role) {
    return this.httpInstance.get(`${this.rootUrl}registration/?role=${role}`);
  }

  getAllRegistrationDetailsByRoleAPI(role) {
    return this.httpInstance.get(`${GlobalConstants.rootAPIUrl}registration/role/${role}`);
  }

  getSpecificProfileDetails(emailId) {
    return this.httpInstance.get(`${this.rootUrl}registration/?email=${emailId}`);
  }

  getSpecificProfileDetailsAPI(emailId) {
    return this.httpInstance.get(`${GlobalConstants.rootAPIUrl}registration/email/${emailId}`);
  }

  getHealthCheckAPI() {
    return this.httpInstance.get(`${GlobalConstants.rootAPIUrl}healthcheck/ping`);
  }

  getHealthCheckAPIFunction() {
    let errorInfoFlag = false;
    this.httpInstance.get(`${GlobalConstants.rootAPIUrl}healthcheck/ping`).subscribe((result) => {
      errorInfoFlag = false;
    },
      error => {
        errorInfoFlag = true;
      });
    return errorInfoFlag;
  }

} 
