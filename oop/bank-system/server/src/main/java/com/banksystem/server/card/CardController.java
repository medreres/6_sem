package com.banksystem.server.card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cards")
public class CardController {

    private final CardService cardService;

    @Autowired
    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("{userId}")
    public List<Card> getCards(@PathVariable("userId") Integer userId) {
        return this.cardService.getCardsByUserId(userId);
    }

    @PostMapping("{userId}")
    public Card createCard(@PathVariable("userId") Integer userId) {
        return this.cardService.createCard(userId);
    }
}
