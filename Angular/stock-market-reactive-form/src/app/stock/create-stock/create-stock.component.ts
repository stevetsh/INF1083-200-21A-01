import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Stock } from 'src/app/model/stock';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent implements OnInit {

  public stock: Stock;
  public message: string = '';

  public stockForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
    code: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
    price: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(private stockService: StockService) {
    this.stock = new Stock('Test Stock Company', 'TSC', 85, 80, '');
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.stock = this.stockForm.value;
    console.log('Stock Form Value', this.stockForm.value);
    console.log('Stock Form Value', this.stock);

    if (this.stockForm.valid) {
      this.stockService.createStock(this.stock)
          .subscribe((result: any) => {
            this.message = result.msg;
            //this.initializeStock();
          }, (err) => {
            this.message = err.error.msg;
          });
    } else {
      console.error('Stock form is in an invalid state');
    }

  }

}
