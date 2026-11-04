package com.dharmaraj.RefineAI.dtos;

public record RefinementRequestDto(
        String prompt,
        Preset preset,
        Tone tone,
        Length length,
        String customInstructions) {

    public enum Preset {
        GENERAL,
        EMAIL,
        PROFESSIONAL_MESSAGE,
        RESUME_CONTENT,
        ACADEMIC_WRITING
    }

    public enum Tone {
        PROFESSIONAL,
        FRIENDLY
    }

    public enum Length {
        SAME_LENGTH,
        SHORTEN
    }
}
