package home.zeto.zeto.services.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "RECORDINGS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recording {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer duration;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    private String sedation;

    private String activation;

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public Status getStatus() {
        return status;
    }
}
