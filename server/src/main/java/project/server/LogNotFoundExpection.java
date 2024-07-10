package project.server;

class LogNotFoundException extends RuntimeException {
  LogNotFoundException(Long id) {
    super("Couldn't find log" + id);
  }
}