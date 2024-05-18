package com.banksystem.server.card;

import com.banksystem.server.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final UserService userService;

    @Autowired
    public CardService(CardRepository cardRepository,
                       UserService userService
    ) {
        this.cardRepository = cardRepository;
        this.userService = userService;
    }

    public List<Card> getCardsByUserId(Integer userId) {
        var user = this.userService.strictGetUserById(userId);

        return user.getCards();
    }

    public Card createCard(Integer userId) {
        Card card = new Card("123123", userId);
        return this.cardRepository.save(card);
    }
}
