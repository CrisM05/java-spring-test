package project.server;

import java.util.List;
import java.util.Optional;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/logs")

/**
 * LogController
 */
public class LogController {
  @Autowired
  private LogRepository logRepository;

  @GetMapping()
  public List<Log> list() {
    List<Log> logs = logRepository.findAll();
    Collections.reverse(logs);
    return logs;
  }

  @PostMapping()
  public Log newLog(@RequestBody Log newLog){
    if (newLog.getBody().length() > 255) {
      return null;
    }
    return logRepository.save(newLog);
  }

  @GetMapping("/{id}")
  public Log findById(@PathVariable Long id) {
    return logRepository.findById(id).orElseThrow(() -> new LogNotFoundException(id));
  }

  @PatchMapping("/{id}") 
  public ResponseEntity<?> updateLog(@PathVariable Long id, @RequestBody LogUpdateDTO newLog) {
    Optional<Log> optionalLog = logRepository.findById(id);
    if (!optionalLog.isPresent()) {
      return new ResponseEntity<>("Log not found", HttpStatus.NOT_FOUND);
    }
    Log currLog = optionalLog.get();
    currLog.setBody(newLog.getBody());
    currLog.update();
    currLog.updateUserData(newLog.getUserData());
    logRepository.save(currLog);
    return new ResponseEntity<>(currLog,HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteLog(@PathVariable Long id) {
    Optional<Log> optionalLog = logRepository.findById(id);
    if (!optionalLog.isPresent()) {
      return new ResponseEntity<>("Log not found",HttpStatus.NOT_FOUND);
    }
    Log curLog = optionalLog.get();
    logRepository.deleteById(id);
    return new ResponseEntity<>(curLog, HttpStatus.OK);
  }
}