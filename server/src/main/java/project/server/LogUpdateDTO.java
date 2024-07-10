package project.server;

public class LogUpdateDTO {
  private String body;

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public LogUpdateDTO (String body) {
    this.body = body;
  }
}
