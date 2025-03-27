package home.zeto.zeto.services.service;

import home.zeto.zeto.services.entity.Recording;
import home.zeto.zeto.services.exceptions.NotFoundException;
import home.zeto.zeto.services.repository.RecordingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecordingService {

    @Autowired
    RecordingRepository recordingRepository;

    public Optional<Recording> getSingle(Long id) {
        return recordingRepository.findById(id);
    }

}
