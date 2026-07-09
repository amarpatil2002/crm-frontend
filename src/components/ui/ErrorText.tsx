type ErrorTextProps = {
  message?: string;
};

export default function ErrorText({ message }: ErrorTextProps) {
  if (!message) return null;

  return <p className="mt-2 text-xs text-rose-500">{message}</p>;
}
