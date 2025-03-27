package home.zeto.zeto.services.service;


import home.zeto.zeto.services.entity.Recording;
import home.zeto.zeto.services.repository.RecordingRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketHandler;

import java.util.List;

@Service
public class DataBroadcastService {

    private SimpMessagingTemplate template;
    private final RecordingRepository recordingRepository;

    public DataBroadcastService(SimpMessagingTemplate template, RecordingRepository repository) {
        this.template = template;
        this.recordingRepository  = repository;
    }

    @Scheduled(fixedRate = 10000) // Every 10 seconds
    public void broadcastData() {
        List<Recording> data = recordingRepository.findAll(); // Fetch from DB
        System.out.println("fetched data");
        System.out.println(data);
        template.convertAndSend("/topic/greetings", data);
    }



}
