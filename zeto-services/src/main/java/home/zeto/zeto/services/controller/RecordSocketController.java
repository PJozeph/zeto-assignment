package home.zeto.zeto.services.controller;

import home.zeto.zeto.services.dto.Response;
import home.zeto.zeto.services.entity.Recording;
import home.zeto.zeto.services.dto.GetSingleDTO;
import home.zeto.zeto.services.service.RecordingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class RecordSocketController {

    @Autowired
    RecordingService recordingService;

    @MessageMapping("/single")
    public ResponseEntity<Response> getSingle(GetSingleDTO getSingleDTO) {
        return this.recordingService.getSingle(getSingleDTO);
    }

    @MessageMapping("/update")
    public ResponseEntity<?> update(Recording recording) {
        return recordingService.update(recording);
    }

}
