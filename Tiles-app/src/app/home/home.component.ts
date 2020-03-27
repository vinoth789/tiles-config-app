import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormArray, FormControl } from '@angular/forms';
import { ConfigsService } from '../configs.service';
import { Observable, of } from "rxjs";
import { MatDialog, MatTable } from '@angular/material';
import {Config} from '../config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

data: Config[] = [];
entry: Config  = null;
btnlabel: string = null;
arrConfig: any;
tileConfig: Config[] = [];

constructor(private http: HttpClient, private configService: ConfigsService) {
  
}

  editConfig(e)
  {
    this.entry = e;
    this.btnlabel = "Update";
  }

  addConfigEntries()
  {
    this.deleteConfig(this.entry);
    this.data.push(this.entry);
    this.entry = null;
  }

  addNewConfig()
  {
    this.entry = new Config();
    this.btnlabel = "Add";
  }

  deleteConfig(e)
  {
    this.data = this.data.filter( (d)=>d!=e );
  }

private setting = {
  element: {
    dynamicDownload: null as HTMLElement
  }
}

validateConfigData() {
  let dataEntries : any;
  let dataArr = [];
  var dataKey : any;
  var dataValue : any;

  this.data.forEach( (element) => {
    let c:Config = new Config();
    c.name = element.name;
    c.text = element.text;
    c.img = element.img;
    c.icon = element.icon;
    dataEntries = element.data;
    dataEntries.forEach( (datatElt) => {
      
      dataKey = datatElt.key;
      dataValue = datatElt.value;

      c.addEntry(dataKey+":"+ dataValue+",");
    });  
    this.tileConfig.push(c);
  });

 console.log(dataArr); 
  return of({
    config: this.tileConfig,
  });
}

createConfigJson() {
  this.validateConfigData().subscribe((res) => {
    this.dyanmicDownloadByHtmlTag({
      fileName: 'My Report.json',
      text: JSON.stringify(res)
    });
  });
}

private dyanmicDownloadByHtmlTag(arg: {
  fileName: string,
  text: string
}) {
  if (!this.setting.element.dynamicDownload) {
    this.setting.element.dynamicDownload = document.createElement('a');
  }
  const element = this.setting.element.dynamicDownload;
  const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
  element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
  element.setAttribute('download', arg.fileName);

  var event = new MouseEvent("click");
  element.dispatchEvent(event);
}

uploadFile(event) {
  
  if (event.target.files.length !== 1) {
    console.error('No file selected');
  } else {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // handle data processing
      this.arrConfig = JSON.parse(reader.result.toString());
      console.log(this.arrConfig.config);
      for (var i in this.arrConfig.config)
      {
        let c:Config = new Config();
              c.name = this.arrConfig.config[i].name;
              c.text = this.arrConfig.config[i].text;
              c.img =  this.arrConfig.config[i].img;
              c.icon = this.arrConfig.config[i].icon;
              c.data = this.arrConfig.config[i].data;
              c.url = this.arrConfig.config[i].url;
        this.data.push(c);
        console.log(this.data); 
      }
      
    };
    reader.readAsText(event.target.files[0]);
  }
  
}
}

