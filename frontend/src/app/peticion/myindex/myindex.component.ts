import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';

@Component({
  selector: 'app-myindex',
  templateUrl: './myindex.component.html',
  styleUrls: ['./myindex.component.css']
})
export class MyindexComponent implements OnInit{
  peticiones: Peticion[] = [];
  isSignedIn: boolean = false;
  loggedUser: any;


  constructor(public peticionService:PeticionService,
    private authService:AuthService,
    private auth:AuthStateService,
    public token: TokenService,
    public router:Router
    ){}

  ngOnInit(): void {
    this.peticionService.getAllByUser().subscribe((data:Peticion[])=>{
      this.peticiones = data;
      console.log(this.peticiones);
    });

    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
    });
    this.getUserLogged();
  }

  deletePeticion(id:number){
    this.peticionService.delete(id).subscribe(res=>{
      this.peticiones = this.peticiones.filter(item => item.id !== id);
    })
  }

  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
