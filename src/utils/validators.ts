export function required(value: string, label: string): string | null {
  return value.trim() ? null : `${label} é obrigatório.`;
}

export function requiredFile(file: File | null, label: string): string | null {
  return file ? null : `${label} é obrigatório.`;
}

export function isEmail(value: string): string | null {
  if (!value) return null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? null
    : "E-mail inválido.";
}

export function isCpf(value: string): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 ? null : "CPF inválido.";
}

export function isCep(value: string): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  return digits.length === 8 ? null : "CEP inválido.";
}

export interface ValidationRule {
  validate: (value: string) => string | null;
  label: string;
}

export interface FileValidationRule {
  validate: (file: File | null) => string | null;
  label: string;
}

export function validateFields(
  fields: Record<string, string>,
  rules: ValidationRule[],
): string[] {
  const errors: string[] = [];
  for (const rule of rules) {
    const error = rule.validate(fields[rule.label]);
    if (error) errors.push(error);
  }
  return errors;
}

export function validateFiles(
  files: Record<string, File | null>,
  rules: FileValidationRule[],
): string[] {
  const errors: string[] = [];
  for (const rule of rules) {
    const error = rule.validate(files[rule.label]);
    if (error) errors.push(error);
  }
  return errors;
}
