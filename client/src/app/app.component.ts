import { Component, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

    message: string;
    nickName: string;
    date = new Date();
    messageList: any[] = [];
    shapeList: any[] = [];
    messageType = 'text';
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    constructor(private chat: ChatService) { }
  
    ngOnInit() {
      this.chat.messages.subscribe(msg => {
        this.messageList.push(JSON.parse(msg.text));
        console.log(this.messageList);
      })
    }
  
    sendMessage() {
      const message = {
        nick_name : this.nickName,
        text : this.message,
        updated_at: this.date,
        shapes : this.messageType === 'draw' ? this.shapeList : []
      };
      this.chat.sendMsg(message);
    }

    ngAfterViewChecked() {
      this.scrollToBottom();
    }

    scrollToBottom(): void {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }

    getFirstLetter(name: string) {
      return name.charAt(0).toLocaleUpperCase();
    }

    getShapes(event) {
      this.shapeList = event;
    }
}
