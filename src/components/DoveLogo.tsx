import doveLogo from '../assets/dove-logo.png';

export function DoveLogo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/55 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur">
      <img
        src={doveLogo}
        alt="Dove logo"
        className="h-11 w-11 object-contain"
      />
    </div>
  );
}
