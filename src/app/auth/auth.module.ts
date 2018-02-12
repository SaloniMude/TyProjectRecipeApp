
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
        ],
        imports: [
            FormsModule,
            AuthRoutingModule,
            CommonModule
        ]
    }
)
export class AuthModule{

}