package home.zeto.zeto.services.controller;

import home.zeto.zeto.services.model.Message;
import home.zeto.zeto.services.model.OutputMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class FooController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public OutputMessage send(Message message) throws Exception {
        System.out.println(message);
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }

}
