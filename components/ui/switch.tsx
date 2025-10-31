import * as React from 'react';

export function Switch({ id, checked, onCheckedChange }: { id?: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-emerald-600' : 'bg-slate-300'
      }`}
      aria-pressed={checked}
      aria-label="Toggle"
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

