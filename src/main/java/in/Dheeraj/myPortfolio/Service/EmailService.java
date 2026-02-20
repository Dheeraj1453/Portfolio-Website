package in.Dheeraj.myPortfolio.Service;

import in.Dheeraj.myPortfolio.DTO.ContactDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    // (required = false) allows the app to start even if JavaMailSender isn't configured
    @SuppressWarnings("unused")
    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Async
    public void sendEmail(ContactDTO contactDTO) {
        // Leave this empty.
        // We do not want the backend to try sending emails anymore.
        // This stops the 'Connection Timed Out' error on Render.
        System.out.println("Backend: DB save confirmed. Skipping SMTP send (Handled by EmailJS).");
    }
}