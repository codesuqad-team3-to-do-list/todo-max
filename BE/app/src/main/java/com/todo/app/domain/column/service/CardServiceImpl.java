package com.todo.app.domain.column.service;

import com.todo.app.domain.column.domain.Card;
import com.todo.app.domain.column.domain.CardCreate;
import com.todo.app.domain.column.domain.CardUpdate;
import com.todo.app.domain.column.repository.CardRepository;
import com.todo.app.domain.history.service.HistoryService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class CardServiceImpl implements CardService {
    private static final Long WEIGHT_VALUE_INTERVAL = 1000L;

    private final CardRepository cardRepository;
    private final HistoryService historyService;

    public CardServiceImpl(CardRepository cardRepository, HistoryService historyService) {
        this.cardRepository = cardRepository;
        this.historyService = historyService;
    }

    @Override
    public Card create(CardCreate card) {
        return cardRepository.save(card);
    }

    @Override
    public void update(CardUpdate card) {
        cardRepository.update(card);
    }


    @Override
    public void move(final Card card, final Long previousCardId, final Long nextCardId) {
        if (!cardRepository.existsCard(card.getId())) {
            throw new IllegalArgumentException("카드가 존재하지 않습니다.");
        }

        List<Long> weightValues = getWeightValues(previousCardId, nextCardId);

        if (isFullWeightValues(weightValues)) {
            resizeAllWeightValues(card.getColumnId());
            weightValues = getWeightValues(previousCardId, nextCardId);
        }

        card.resizeWeightValue(weightValues.get(0), weightValues.get(1));
        cardRepository.updateMove(card);
    }

    @Override
    public void delete(Long cardId) {
        cardRepository.delete(cardId);
    }

    private List<Long> getWeightValues(final Long previousCardId, final Long nextCardId) {
        final List<Long> weightValues = cardRepository.findWeightsBy(previousCardId, nextCardId);

        if (previousCardId == 0L) {
            return List.of(0L, weightValues.get(0));
        }
        if (nextCardId == 0L) {
            final Long lastCardWeightValue = weightValues.get(0);

            return List.of(lastCardWeightValue, lastCardWeightValue + (WEIGHT_VALUE_INTERVAL * 2));
        }

        return weightValues;
    }

    public void resizeAllWeightValues(final Long columnId) {
        final List<Card> cards = cardRepository.findCardsBy(columnId);
        long weightValue = WEIGHT_VALUE_INTERVAL;

        for (Card card : cards) {
            card.resizeWeightValue(weightValue);
            weightValue += WEIGHT_VALUE_INTERVAL;
        }

        cardRepository.updateWeightValueCards(cards);
    }

    private boolean isFullWeightValues(List<Long> weightValues) {
        final Long previousWeightValue = weightValues.get(0);
        final Long nextWeightValue = weightValues.get(1);

        return (nextWeightValue - previousWeightValue) <= 1L;
    }
}
