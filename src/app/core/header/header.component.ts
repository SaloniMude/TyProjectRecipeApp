import { Component,Output,EventEmitter } from "@angular/core";
import { DataStorageService } from "app/shared/data-storage.service";
import { Response } from "@angular/http";
import { AuthService } from "../../auth/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component ({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
    
})

export class HeaderComponent {
    constructor(private dataStroageService: DataStorageService,
        private authService: AuthService,
        private router: Router ) {

    }

    onSaveData() {
        this.dataStroageService.storeRecipes().subscribe(
            (response : Response) => {
                console.log(response);
            }
        );
    }

    onFetchData(){
        this.dataStroageService.getRecipes();
    }

    onLogout(){
        this.authService.logout();
        this.router.navigate(['/signin']);
    }
}