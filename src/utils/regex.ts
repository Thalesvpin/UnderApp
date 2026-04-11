export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NAME_REGEX = /[a-zA-ZÀ-ÿ\s]/g;
export const EVERYTHING_BUT_LETTERS_REGEX = /[^a-zA-ZÀ-ÿ\s]/g;

export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

export const CEP_REGEX = /^[0-9]{8}$/;
export const EVERYTHING_BUT_NUMBERS_REGEX = /[^0-9]/g;