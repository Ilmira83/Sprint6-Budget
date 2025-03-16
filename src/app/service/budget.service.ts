import { computed, Injectable, OnInit, signal } from '@angular/core';
import { Budget, savedBudget } from '../interfaces/budget';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgets:Budget[] = [
  { title: 'Seo',
    description: 'Complete creation of responsive WEB',
    price: 300,
  },
  { title: 'Ads',
    description: 'Complete creation of responsive WEB',
    price: 400,
  },
  { title: 'Web',
    description: 'Complete creation of responsive WEB',
    price: 500,
  }]; 
  name = ''
  email = ''
  nPhone = ''
  searchCriteria = signal<string>('')
  numberOfPages = signal<number>(0);
  numberOfLangs = signal<number>(0);
  budgetPrices = signal<number[]>([]);
  custompanelPrices = signal<number[]>([]);
  finalBudgetPrice = signal<number[]>([0]);
  savedServices = signal<string[]>([]);
  allSavedBudgets = signal<savedBudget[]>([]);
  resetCheckboxTrigger = signal<boolean>(false);
  openPanel = signal<boolean>(false);

  showBudgets=()=>this.budgets

  calcBudgetPrice = computed(() => this.budgetPrices().reduce((tot:number, item:number) => (tot + item), 0))
  calcPanelPrice = computed(() =>  this.custompanelPrices().at(-1)!);
  calcFinalPrice = () => { 
    const panelPrice = isNaN(this.calcPanelPrice()) ? 0 : this.calcPanelPrice();
    const budgetPrice = isNaN(this.calcBudgetPrice()) ? 0 : this.calcBudgetPrice();
    this.finalBudgetPrice.set([panelPrice + budgetPrice]) 
  }

  getSavedBudget():savedBudget[]{
    return [
      { name: this.name,
        email: this.email,
        phone: this.nPhone,
        service:  this.savedServices(),
        price: this.finalBudgetPrice()
      }
    ]}
  getAllSavedBudgets(){
      this.allSavedBudgets.update(v=> [...v, ...this.getSavedBudget()])
  }
  
  filteredBudget=computed(()=>this.allSavedBudgets().filter(budget => budget.name.toLowerCase().includes(this.searchCriteria().toLowerCase())));
 
  alphabetSorted =()=>{  this.filteredBudget().sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })
  };
  priceSorted =()=>{  this.filteredBudget().sort((a, b) => {
      const sumA = a.price.reduce((acc, val) => acc + val, 0);  
      const sumB = b.price.reduce((acc, val) => acc + val, 0); 
      return sumA - sumB;
    })
  };
  resetValues(){
    this.numberOfPages.set(0);
    this.numberOfLangs.set(0);
    this.custompanelPrices.set([0])
    this.budgetPrices.set([0])
    this.finalBudgetPrice.set([0])
    this.savedServices.set([])
    this.openPanel.set(false)
  }
}
