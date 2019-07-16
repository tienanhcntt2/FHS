export class Info {
  
    constructor(
        private id: number,
        private name: string,
        private address: string,
        private zip: number,
        private gender: string
    ){}
 
    public get_id(): number{
        return this.id;
    }
 
    public get_name() : string{
        return this.name;
    }
 
    public get_address() : string{
        return this.address;
    }
 
    public get_zip() : number{
        return this.zip;
    }
 
    public get_gender() : string{
        return this.gender;
    }
 
}