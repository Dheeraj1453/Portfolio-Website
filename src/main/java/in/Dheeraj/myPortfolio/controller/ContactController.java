package in.Dheeraj.myPortfolio.controller;

import in.Dheeraj.myPortfolio.DTO.ContactDTO;
import in.Dheeraj.myPortfolio.Service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping("/contact")
    public String showContactPage(Model model) {
        model.addAttribute("title", "Contact");
        if (!model.containsAttribute("contactDTO")) {
            model.addAttribute("contactDTO", new ContactDTO());
        }
        return "master";
    }

    //Changed to accept JSON (@RequestBody) and return JSON (ResponseBody)
    @PostMapping("/contact/save")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> saveContactMessage(@Valid @RequestBody ContactDTO contactDTO, BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();

        if (bindingResult.hasErrors()) {
            response.put("success", false);
            response.put("message", "Please fix the errors in the form.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // This service method saves to DB and sends the email
            contactService.saveMessage(contactDTO);
            
            response.put("success", true);
            response.put("message", "Done! Message sent and saved successfully.");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error sending message: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
}