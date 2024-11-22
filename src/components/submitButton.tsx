"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  loadingText: string;
}

export default function SubmitButton({ text, loadingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-zinc-900 disabled:bg-zinc-500 transition text-white rounded py-2 px-3"
    >
      {pending ? loadingText : text}
    </button>
  );
}
