import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../service/budget.service';
import { InfoalertService } from '../../service/infoalert.service';
import { NotificationComponent } from "./notification/notification.component";


@Component({
  selector: 'app-custompanel',
  imports: [CommonModule, NotificationComponent],
  templateUrl: './custompanel.component.html',
  styleUrl: './custompanel.component.css'
})
export class CustompanelComponent {
    budgetServices = inject(BudgetService);
    numberOfPages = this.budgetServices.numberOfPages;
    numberOfLangs = this.budgetServices.numberOfLangs;
    custompanelPrices = this.budgetServices.custompanelPrices;
    
    infoMess = inject(InfoalertService);
    toggledInfo:boolean = false; 
    messPages = this.infoMess.messPages;
    messLangs = this.infoMess.messLangs;


    constructor(){
      effect(()=>{ this.getCustomPanelPrices();
        this.budgetServices.calcFinalPrice()
       })
    } 
    getCustomPanelPrices=()=> this.custompanelPrices.set([(this.numberOfPages() + this.numberOfLangs()) * 30]);
    
    increasePages = () => this.numberOfPages.update(v => v+1);
  
    decreasePages = () => { 
      if(this.numberOfPages() > 0) { this.numberOfPages.update(v=> v-1)}
    }
    increaseLangs = () => this.numberOfLangs.update(v => v+1);
    decreaseLangs = () => { 
      if(this.numberOfLangs() > 0) { this.numberOfLangs.update(v=> v-1)}
    }

    showInfoPages(event: MouseEvent){
      event.stopPropagation();
      this.infoMess.showInfo(this.messPages)
      this.toggledInfo = true
    }
    showInfoLangs(event: MouseEvent){
      event.stopPropagation();
      this.infoMess.showInfo(this.messLangs)
      this.toggledInfo = true
    }
    
    closeInfo=()=> this.toggledInfo = false
      
    ngOnInit(){
      window.addEventListener('click', () => this.closeInfo());
    }
    ngOnDestroy() {
      window.removeEventListener('click', () => this.closeInfo());
    }

  



}
