import { Component, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../service/budget.service';
import { CustompanelComponent } from "./custompanel/custompanel.component";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustombudgetComponent } from "./custombudget/custombudget.component";


@Component({
  selector: 'app-budget',
  imports: [CustompanelComponent, CommonModule, CustombudgetComponent, ReactiveFormsModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit{
  budgetServices = inject(BudgetService);
  budgets = this.budgetServices.budgets;
  budgetPrices = this.budgetServices.budgetPrices
  counter:number = -1;
  openPanel = /* signal<boolean>(false); */ this.budgetServices.openPanel;
  finalBudgetPrice = this.budgetServices.finalBudgetPrice

  numberOfPages = this.budgetServices.numberOfPages;
  numberOfLangs = this.budgetServices.numberOfLangs;
  custompanelPrices = this.budgetServices.custompanelPrices;
  savedServices = this.budgetServices.savedServices
  resetCheckboxTrigger = this.budgetServices.resetCheckboxTrigger
  budgetForm: FormGroup;
 
  constructor(private fb: FormBuilder){
    this.budgetForm = this.fb.group({
      checkBoxActive: new FormControl(false),
      budgetPrices: this.fb.array([
        
      ]),
    });
    effect(()=>{
      if(this.resetCheckboxTrigger()){
        this.resetCheckboxes();
        this.resetCheckboxTrigger.set(false);
      }
    })
  }

  getBudgetPrice(e:any){
    const prices = this.budgetForm.get('budgetPrices') as FormArray;
    if(e.target.checked) {
      prices.push(new FormControl(Number(e.target.value)))
      this.budgetPrices.set(prices.value)
    }else {
      let i = 0;
      prices.controls.forEach((p: any)  => {
        if(p.value == e.target.value) {
          prices.removeAt(i);
          this.budgetPrices.set(prices.value);
          this.custompanelPrices.set([0])
          this.numberOfPages.set(0);
          this.numberOfLangs.set(0);
          return;
        }
        i++;
      });
    }
  }
  resetCheckboxes=()=> {
    const controls = this.budgetForm.get('checkBoxActive');
    if(controls){
      controls?.setValue(false)
    };
    this.budgetForm.reset()
  };

  saveServices(index:number, e: any) {
    if(e.target.checked) {
      this.savedServices.update(v => [...v, this.budgets[index].title]);
    } else {
      this.savedServices.update(v => v.filter(v => v !== this.budgets[index].title));
    }
  }
  ngOnInit(): void {
    this.budgetServices.showBudgets()
  }

  isOpen(index: number) {
    if(this.counter === index) {        //доработать открытие доппанели когда анклик чекбокса идет 
      this.openPanel.set(!this.openPanel());
      return
    } else {
      this.openPanel.set(true);
      this.counter = index;
    }
  } 

  checkBoxActive(index: number, e:any){
    this.isOpen(index)
    this.getBudgetPrice(e)
    this.saveServices(index, e)
    this.budgetServices.calcFinalPrice()
  }


}
