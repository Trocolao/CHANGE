import { Data } from "@angular/router";

export interface Peticion {
    id:number,
    titulo:string,
    descripcion:string,
    destinatario:string,
    firmantes:number,
    estado:string,
    user:any,
    categoria_id:number,
    file:string;
    files:any;
}
