import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Config} from '../config';
import { FormGroup,  FormBuilder,  Validators, FormArray, FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-config-add',
  templateUrl: './config-add.component.html',
  styleUrls: ['./config-add.component.css']
})
export class ConfigAddComponent {

  @Input("entry") entry: Config;
  @Input() btnlabelValue: string;
  @Output("onapply") onChange = new EventEmitter<Config>();

  data: any;

  constructor()
  {
    this.data = Config.CreateEmptyData();
  }

  addData()
  {
    this.entry.addEntry(this.data);
    this.data = Config.CreateEmptyData();
  }

  deleteData(d)
  {
    this.entry.delEntry(d);
  }

  Apply()
  {
    this.onChange.emit(this.entry);
  }

}
