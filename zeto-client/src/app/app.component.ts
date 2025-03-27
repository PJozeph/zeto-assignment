import { AfterViewChecked, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './servcies/socket.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, AfterViewChecked {
  
  title = 'zeto-client';


  websocketService : SocketService = inject(SocketService);
  
  ngOnInit(): void {
    //this.websocketService.connect((message: any) => {});
    
  }

  foo(){
    //this.websocketService.watch();
  }
  
  onButtonClick() {
    this.websocketService.sendMessage({ text: 'Hello, world!', from: 'me' });
    console.log('Button clicked');
  }

  ngAfterViewChecked(): void {
    this.websocketService.watch();
  }

}
