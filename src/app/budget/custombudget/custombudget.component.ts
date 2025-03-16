import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { BudgetService } from '../../service/budget.service';

@Component({
  selector: 'app-custombudget',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custombudget.component.html',
  styleUrl: './custombudget.component.css'
})
export class CustombudgetComponent {
  budgetServices = inject(BudgetService);
  name = this.budgetServices.name
  email = this.budgetServices.email
  nPhone = this.budgetServices.nPhone
  allSavedBudgets = this.budgetServices.allSavedBudgets
  searchCriteria = this.budgetServices.searchCriteria
  filteredBudget = this.budgetServices.filteredBudget
  dataSent:boolean = false

  customBudgetForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.customBudgetForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]+$/)] ),
      email: new FormControl('', [Validators.required, Validators.email]),
      searchCriteria: new FormControl('')
    });
  }

  getInputData(){
    this.budgetServices.name = this.customBudgetForm.value.name;
    this.budgetServices.nPhone = this.customBudgetForm.value.phone;
    this.budgetServices.email = this.customBudgetForm.value.email;
  }
  getSearchCriteria=()=> this.searchCriteria.set(this.customBudgetForm.value.searchCriteria);

  alphabetSorted =()=> this.budgetServices.alphabetSorted();

  priceSorted =()=> this.budgetServices.priceSorted();

  sendData(){ 
    this.getInputData()
    this.budgetServices.getSavedBudget()
    this.budgetServices.getAllSavedBudgets()
    this.dataSent = true
    this.budgetServices.resetCheckboxTrigger.set(true)
    this.budgetServices.resetValues()
    this.customBudgetForm.reset()
  }
  

}
