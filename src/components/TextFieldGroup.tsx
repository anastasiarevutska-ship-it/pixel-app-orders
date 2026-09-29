import styles from './TextFieldGroup.module.css';

export type TextFieldSpec = {
  name: string;
  placeholder: string;
  value: string;
  autoComplete?: string;
  inputMode?: 'text' | 'numeric';
  maxLength?: number;
};

type TextFieldGroupProps = {
  fields: TextFieldSpec[];
  onChange: (name: string, value: string) => void;
};

/** Figma "TextField_Light": stacked 48px glass inputs with a Lavender stroke. */
export function TextFieldGroup({ fields, onChange }: TextFieldGroupProps) {
  return (
    <div className={styles.group}>
      {fields.map((f) => (
        <input
          key={f.name}
          className={`${styles.input} t-body`}
          name={f.name}
          aria-label={f.placeholder}
          placeholder={f.placeholder}
          value={f.value}
          autoComplete={f.autoComplete}
          inputMode={f.inputMode}
          maxLength={f.maxLength}
          onChange={(e) => onChange(f.name, e.target.value)}
        />
      ))}
    </div>
  );
}
