import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex flex-col gap-0.5 group">
      <span className="text-2xl font-bold tracking-tight leading-none">
        SN<span className="text-accent">X</span>{' '}
        <span className="font-light">Studio</span>
      </span>
    </Link>
  );
}
