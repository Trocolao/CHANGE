import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    imageSrc:string='';
  form!: FormGroup;
    selectedImage!:any;
    categorias:any=[];
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public peticionService: PeticionService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    

    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      destinatario: new FormControl('', [Validators.required]),
      
      categoria_id: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
    
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   */
  /*submit(){
    console.log(this.form.value);
    this.peticionService.create(this.form.value).subscribe((res:any) => {
         console.log('Peticion created successfully!');
         this.router.navigateByUrl('peticion/index');
    })
  }*/
  submit(form: FormGroup){
    const formData = new FormData();
    formData.append('titulo', form.value.titulo);
    formData.append('descripcion', form.value.descripcion);
    formData.append('destinatario', form.value.destinatario);
    formData.append('categoria_id', form.value.categoria_id); // Usar form.value.categoria en lugar de form.value.categoria_id
    formData.append('file', this.selectedImage);

    this.peticionService.create(formData).subscribe((res:any)=>{
      console.log('Peticion created succesfully');
      this.router.navigateByUrl('peticion/index');
    })

}

  onSelectFile(event:any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      this.selectedImage=file;
    }
  }
  
}