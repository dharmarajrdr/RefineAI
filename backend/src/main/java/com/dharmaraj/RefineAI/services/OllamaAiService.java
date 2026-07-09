package com.dharmaraj.RefineAI.services;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.api.OllamaChatOptions;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public final class OllamaAiService {

    private final ChatModel chatModel;

    public OllamaAiService(@Qualifier("ollamaChatModel") ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    private OllamaChatOptions getOllamaChatOptions() {

        return OllamaChatOptions.builder().model("gemma3:4b").temperature(0.4).build();
    }

    public String getResponse(String message) {

        if (message.trim().isBlank())
            throw new RuntimeException("Prompt cannot be empty");

        Prompt prompt = new Prompt(AiRuleSetter.setContext(message), getOllamaChatOptions());
        ChatResponse response = chatModel.call(prompt);

        return Objects.requireNonNull(response.getResult()).getOutput().getText();
    }
}
