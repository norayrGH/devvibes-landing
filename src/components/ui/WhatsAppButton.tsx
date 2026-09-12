import { useContent } from '../../lib/useContent';
import { useCopy } from '../../lib/i18n';

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2.1 22l5.34-1.4a9.83 9.83 0 0 0 4.6 1.17h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2Zm0 17.93h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 8.19 8.2c0 4.52-3.68 8.19-8.19 8.19Z" />
    </svg>
  );
}

/** Renders nothing until a real number exists — never a dead chat link. */
export function WhatsAppLink({ className = '' }: { className?: string }) {
  const { whatsapp } = useContent('contact');
  const t = useCopy();
  if (!whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-ghost ${className}`}
    >
      {t.cta.whatsapp}
      <WhatsAppIcon />
    </a>
  );
}

/**
 * Persistent tap target on phones. WhatsApp is the default business channel in
 * Armenia, so on mobile it stays reachable rather than living only at the very
 * bottom of a long single page.
 */
export function WhatsAppFab() {
  const { whatsapp } = useContent('contact');
  const t = useCopy();
  if (!whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.cta.whatsapp}
      className="lg:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] active:scale-95 transition-transform"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
