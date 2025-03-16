import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoalertService {
  mess = signal<string>('')
  messPages:string = 'Choose how many pages you want for your APP. Each page costs 30$.';
  messLangs:string = 'Choose languages for your APP. Each language costs 30$.'
  
  showInfo=(info:string)=> this.mess.set(info) 
  
}
