package home.zeto.zeto.services.service;


import home.zeto.zeto.services.entity.Recording;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataBroadcastService {

    private final SimpMessagingTemplate template;
    private final RecordingService recordingService;

    public DataBroadcastService(SimpMessagingTemplate template, RecordingService service) {
        this.template = template;
        this.recordingService  = service;
    }

    @Scheduled(fixedRate = 5000) // Every 5 seconds
    public void broadcastData() {
        List<Recording> records = recordingService.findAll(); // Fetch from DB
        template.convertAndSend("/topic/records", records);
    }

}
