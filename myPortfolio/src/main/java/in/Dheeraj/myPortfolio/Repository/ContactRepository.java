package in.Dheeraj.myPortfolio.Repository;

import in.Dheeraj.myPortfolio.Entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
}