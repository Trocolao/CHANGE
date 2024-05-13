import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Peticion } from '../peticion';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  peticion!: Peticion;
  image: string = "";
  categoria: number = 0;
  isSignedIn: boolean = false;
  loggedUser: any;
  puedeFirmar:boolean=false;

  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public peticionService: PeticionService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private auth:AuthStateService,
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['peticionId'];

    this.peticionService.find(this.id).subscribe((data: Peticion) => {
      this.peticion = data;
      
      this.image = this.serverURL + this.peticion.files[0].file_path;
      console.log(this.image)
    });
    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
    });
    this.getUserLogged();
    this.CanSign(this.id);
  }

  firma(id: Number) {
    this.peticionService.firmar(id).subscribe((data: Peticion) => {
      this.peticion = data;
      this.router.navigateByUrl('peticion/index');
    })
  }
  cambiarEstado(id: Number) {
    this.peticionService.cambiarEstado(id).subscribe((data: Peticion) => {
      this.peticion = data;
      this.router.navigateByUrl('peticion/index');
    })
  }
  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
  CanSign(id:number){
    this.peticionService.puedeFirmar(id).subscribe((data: boolean) => {
      this.puedeFirmar = data;
      console.log(this.puedeFirmar);

    })
  }

}