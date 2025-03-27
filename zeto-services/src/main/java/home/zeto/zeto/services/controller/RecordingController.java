package home.zeto.zeto.services.controller;

import home.zeto.zeto.services.entity.Recording;
import home.zeto.zeto.services.exceptions.NotFoundException;
import home.zeto.zeto.services.service.RecordingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("record")
public class RecordingController {

    @Autowired
    RecordingService recordingService;

    @GetMapping("/{id}")
    Recording getSingle(@PathVariable("id") Long id) {
        return recordingService.getSingle(id).orElseThrow(
                () -> new NotFoundException("")
        );
    }

}
