import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class LocalStorageService {

    constructor() {}

    getLoanNumber() {
        let userData = localStorage.getItem('userData')
        let loanNumber = JSON.parse(userData).loanNumber
        return loanNumber
    }

}