import { Component } from '@angular/core';
import { FormBuilder, Validators ,FormGroup,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequestService } from '../user-request.service';
import { ToastrService } from 'ngx-toastr';
import { CustomvalidationService } from '../customvalidation.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  submitted = false;
  // registerForm = this.fb.group({
  //   userMailId: [null,Validators.required],
  //   userName: [null, Validators.required],
  //   userPassword: [null, Validators.required],
  //   userPhoneNo: [null, Validators.required],
  //   address2: null,
  //   city: [null, Validators.required],
  //   state: [null, Validators.required],
  //   postalCode: [null, Validators.compose([
  //     Validators.required, Validators.minLength(5), Validators.maxLength(5)])
  //   ],
  //   shipping: ['free', Validators.required]
  // });

  registerForm=new FormGroup(
    {
      userMailId:new FormControl('', Validators.compose([Validators.required, this.customValidator.emailPatternValidator()])),
      userName:new FormControl('',Validators.required),
      userPassword: new FormControl('', Validators.compose([Validators.required, this.customValidator.patternValidator()])),
      
      userPhoneNo: new FormControl(null, Validators.required),
      addressList:new FormGroup({
        addressType:new FormControl('',Validators.required),
        streetNo:new FormControl('',Validators.required),
        streetName:new FormControl('',Validators.required),
        city:new FormControl('',Validators.required),
        state:new FormControl('',Validators.required),
        pincode:new FormControl('',Validators.required),
        landmark:new FormControl('',Validators.required),
      })
    });

    
    types: Type[] = [
      {value: 'Work', viewValue: 'Work'},
      {value: 'Home', viewValue: 'Home'}]

  constructor(private fb: FormBuilder,private userRequest:UserRequestService,private router:Router,private toastr: ToastrService,private customValidator:CustomvalidationService) {}

  public selectedFile:any;
  public event1:any;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  
  public  onFileChanged(event:any) {   
    this.selectedFile = event.target.files[0];
    let reader=new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event2)=>{
    this.imgURL=reader.result;
    }
}

onSubmit(): void {
  this.submitted = true;
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  uploadImageData.append('uploadData', JSON.stringify(this.registerForm.value))

  // this.userRequest.uploadImage(this.selectedFile).subscribe(()=>{

  // })

 this.userRequest.register(uploadImageData).subscribe(()=>{
  this.toastr.success('Registration Success');
    this.router.navigate(['/login']);
 })
}
}
