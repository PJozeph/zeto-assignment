package home.zeto.zeto.services.service;

import home.zeto.zeto.services.dto.Response;
import home.zeto.zeto.services.entity.Recording;
import home.zeto.zeto.services.entity.Status;
import home.zeto.zeto.services.dto.GetSingleDTO;
import home.zeto.zeto.services.repository.RecordingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecordingService {

    @Autowired
    RecordingRepository recordingRepository;

    public ResponseEntity<Response> getSingle(GetSingleDTO getSingleDTO) {
        Optional<Recording> recording = this.recordingRepository.findById(getSingleDTO.getId());
        if (recording.isPresent()) {
            Response<Recording> response = Response.<Recording>builder()
                    .content(recording.get())
                    .build();
            return ResponseEntity.ok(response);
        }
        Response<String> errorResponse = Response.<String>builder()
                .error("Recording not found")
                .errorCode(HttpStatus.NOT_FOUND.value())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    public ResponseEntity<Response> update(Recording recording) {
        Optional<Recording> record = this.recordingRepository.findById(recording.getId());
        if (record.isPresent()) {
            if (Status.RECORDED == record.get().getStatus()) {
                Recording saved = this.recordingRepository.save(recording);
                Response<Recording> response = Response.<Recording>builder()
                        .content(saved)
                        .build();
                return ResponseEntity.ok(response);
            } else {
                Response<String> errorResponse = Response.<String>builder()
                        .error("Recording can not be updated")
                        .errorCode(HttpStatus.BAD_REQUEST.value())
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        }
        Response<String> errorResponse = Response.<String>builder()
                .error("Recording not found")
                .errorCode(HttpStatus.NOT_FOUND.value())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    public List<Recording> findAll() {
        return this.recordingRepository.findAll();
    }


}
