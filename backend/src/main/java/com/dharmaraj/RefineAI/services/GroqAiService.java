package com.dharmaraj.RefineAI.services;

import lombok.AllArgsConstructor;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@AllArgsConstructor
public final class GroqAiService {

    private final OpenAiChatModel chatModel;

    private OpenAiChatOptions getGroqChatOptions() {
        return OpenAiChatOptions.builder()
                .model("llama-3.1-8b-instant")
                .temperature(0.4)
                .build();
    }

    public String getResponse(String message) {

        if (message.trim().isBlank())
            throw new RuntimeException("Prompt cannot be empty");

        Prompt prompt = new Prompt(AiRuleSetter.setContext(message), getGroqChatOptions());
        ChatResponse response = chatModel.call(prompt);

        return Objects.requireNonNull(response.getResult()).getOutput().getText();
    }
}