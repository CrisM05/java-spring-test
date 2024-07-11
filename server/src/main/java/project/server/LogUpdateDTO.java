package project.server;

public class LogUpdateDTO {
  private String body;
  private String userData;
  
  public LogUpdateDTO() {
  }

  public String getBody() {
    return body;
  }

  public String getUserData() {
    return userData;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public void setUserData(String userData) {
    this.userData = userData;
  }

  public LogUpdateDTO (String body, String userData) {
    this.body = body;
    this.userData = userData;
  }
}
