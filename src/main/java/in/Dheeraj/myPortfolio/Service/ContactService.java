package in.Dheeraj.myPortfolio.Service;

import in.Dheeraj.myPortfolio.DTO.ContactDTO;
import in.Dheeraj.myPortfolio.Entity.ContactMessage;
import in.Dheeraj.myPortfolio.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private EmailService emailService; // Add this back

    public void saveMessage(ContactDTO contactDTO) {
        ContactMessage message = new ContactMessage();
        message.setName(contactDTO.getName());
        message.setEmail(contactDTO.getEmail());
        message.setSubject(contactDTO.getSubject());
        message.setMessage(contactDTO.getMessage());
        
        contactRepository.save(message); // Save to Aiven Database

        // Trigger the (now empty) method to signal completion
        emailService.sendEmail(contactDTO);
    }
}