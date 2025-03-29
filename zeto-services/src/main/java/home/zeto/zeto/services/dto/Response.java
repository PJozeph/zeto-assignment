package home.zeto.zeto.services.dto;

import home.zeto.zeto.services.entity.Recording;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class Response<T> {

    private T content;
    private String error;
    private Integer errorCode;

}
