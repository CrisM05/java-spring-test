package project.server;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

import java.time.LocalDateTime;

/**
 * Log
 */
@Entity
public class Log {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  @Column(name = "edited")
  private boolean edited;
  @Column(name = "body")
  private String body;
  @Column(name = "time")
  private LocalDateTime time;
  @Column(name = "user-data")
  private String userData;

  @PrePersist
  public void prePersist() {
    if (this.time == null) {
      this.time = LocalDateTime.now();
    }
    if (!this.edited) {
      this.edited = false;
    }
  }
  
  public Log() {
    this.edited = false;
    this.time = LocalDateTime.now();
  }

  public String getBody() {
    return body;
  }

  public Long getId() {
    return id;
  }

  public LocalDateTime getTime() {
    return time;
  }

  public boolean getEdited() {
    return edited;
  }

  public String getUserData() {
    return userData;
  }

  // public Time getTime() {
  // return time;
  // }

  public void setBody(String newBody) {
    this.body = newBody;
  }

  public void setUserData(String userData) {
    this.userData = userData;
  }

  public void update() {
    this.time = LocalDateTime.now();
    this.edited = true;
  }

public void updateUserData(String newUserData) {
  this.userData = newUserData;
};

}