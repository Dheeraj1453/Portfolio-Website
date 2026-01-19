package in.Dheeraj.myPortfolio.Service;

import in.Dheeraj.myPortfolio.DTO.ContactDTO;
import in.Dheeraj.myPortfolio.Entity.ContactMessage;
import in.Dheeraj.myPortfolio.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private JavaMailSender mailSender; // Inject Mail Sender

    public void saveMessage(ContactDTO contactDTO) {

        // Save to Database
        ContactMessage message = new ContactMessage();
        message.setName(contactDTO.getName());
        message.setEmail(contactDTO.getEmail());
        message.setSubject(contactDTO.getSubject());
        message.setMessage(contactDTO.getMessage());
        contactRepository.save(message);

        // Send Email Internally
        sendEmail(contactDTO);
    }

    private void sendEmail(ContactDTO contactDTO) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo("dheeraj1453@gmail.com"); // Your email
            mailMessage.setSubject("Portfolio Contact: " + contactDTO.getSubject());
            mailMessage.setText("You received a new message from your Portfolio:\n\n" +
                    "Name: " + contactDTO.getName() + "\n" +
                    "Email: " + contactDTO.getEmail() + "\n\n" +
                    "Message:\n" + contactDTO.getMessage());

            // Check if sender email is valid, else use a default or the user's email if allowed
            mailMessage.setFrom("akarn1728@gmail.com"); 
            
            mailSender.send(mailMessage);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}