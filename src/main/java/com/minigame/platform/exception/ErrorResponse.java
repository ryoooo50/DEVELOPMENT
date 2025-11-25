package com.minigame.platform.exception;

import java.util.Map;

public class ErrorResponse {
    private String code;
    private String message;
    private Integer status;
    private Map<String, String> errors;

    public ErrorResponse(String code, String message, Integer status) {
        this.code = code;
        this.message = message;
        this.status = status;
    }

    public ErrorResponse(String code, String message, Integer status, Map<String, String> errors) {
        this.code = code;
        this.message = message;
        this.status = status;
        this.errors = errors;
    }

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}

