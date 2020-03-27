export class Config {
  name: string;
  text: string;
  img: string;
  icon: string;
  data: any;
  url: string;

  public static CreateEmptyData(): any
  {
    return {key:"" , value:""};
  }

  public delEntry(d: any)
  {
    this.data = this.data.filter( (e)=>e!=d );
  }

  public addEntry(d: any)
  {
    this.data = this.data || [];
    this.data.push(d);
    
  }
  
  }
