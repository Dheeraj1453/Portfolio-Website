package in.Dheeraj.myPortfolio.Service;

import in.Dheeraj.myPortfolio.DTO.ContactDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Inject values from application.properties
    @Value("${spring.mail.username}")
    private String myEmail;

    @Async // <--- This runs the email sending in a background thread
    public void sendEmail(ContactDTO contactDTO) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            // Send TO yourself
            mailMessage.setTo("dheeraj1453@gmail.com"); 
            
            // Set the Subject
            mailMessage.setSubject("Portfolio Contact: " + contactDTO.getSubject());
            
            // Set the Message Body
            mailMessage.setText("New message from Portfolio:\n\n" +
                    "Name: " + contactDTO.getName() + "\n" +
                    "Email: " + contactDTO.getEmail() + "\n\n" +
                    "Message:\n" + contactDTO.getMessage());

            // Set FROM (Must be the same as authenticated user for Gmail)
            mailMessage.setFrom(myEmail); 

            mailSender.send(mailMessage);
            System.out.println("Email sent successfully to " + "dheeraj1453@gmail.com");

        } catch (Exception e) {
            // Logs the error to Railway console so you can debug
            System.err.println("ERROR SENDING EMAIL: " + e.getMessage());
            e.printStackTrace();
        }
    }
}