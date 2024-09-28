import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';  
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';  
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InterceptService } from './modules/auth/services/intercept.service';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
@NgModule({
  declarations: [],  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,  
    AppRoutingModule
  ],  providers: [
    InterceptService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService, 
      multi: true 
    },
    HttpClientModule
  ],
  bootstrap: []  
})
export class AppModule { }
