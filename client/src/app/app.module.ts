import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { WebSocketService } from './service/web-socket.service';
import { ChatService } from './service/chat.service';
import { CanvasToolComponent } from './canvas-tool/canvas-tool.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasToolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    WebSocketService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
