import { useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Clock, AtSign, Navigation } from 'lucide-react';
import { STORE, buildWhatsAppLink, buildGeneralInquiry } from '../data/store';

/**
 * PUBLIC-ONLY contact page. Only confirmed store details — the phone number
 * shown is the placeholder already used across the site until the owner
 * provides the real one (see WHATSAPP_NUMBER in src/data/store.ts).
 */
export default function Contact() {
  useEffect(() => {
    document.title = 'Contact & Visit — RK Boutique & Rentals, Raipur';
  }, []);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${STORE.addressLines.join(', ')}`,
  )}`;

  const cards = [
    {
      icon: <MapPin size={18} className="text-[#9b6b45]" />,
      title: 'Visit the boutique',
      lines: STORE.addressLines,
      action: { label: 'Get Directions', href: mapsUrl },
    },
    {
      icon: <Phone size={18} className="text-[#9b6b45]" />,
      title: 'Call or WhatsApp',
      lines: [STORE.phoneDisplay, 'Tap below to start a chat'],
      action: { label: 'WhatsApp Inquiry', href: buildWhatsAppLink(buildGeneralInquiry()) },
    },
    {
      icon: <Clock size={18} className="text-[#9b6b45]" />,
      title: 'Store hours',
      lines: [STORE.hours],
      action: null,
    },
    {
      icon: <AtSign size={18} className="text-[#9b6b45]" />,
      title: 'Follow along',
      lines: [STORE.instagram],
      action: null,
    },
  ];

  return (
    <main className="bg-[#fbf8f5] pt-20 sm:pt-24">
      <section className="mx-auto max-w-[1500px] px-5 pb-10 pt-8 sm:px-10 sm:pt-12 lg:px-16">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
          Contact
        </p>
        <h1 className="max-w-3xl font-display text-3xl leading-[1.02] tracking-[-0.02em] text-[#241a17] sm:text-5xl lg:text-6xl">
          Come say hello, <span className="italic text-[#9b6b45]">or say it on WhatsApp.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-8 text-[#74665e] sm:text-base">
          Browse styles online before visiting, explore product photos and
          pricing, and ask the boutique anything directly — every inquiry
          carries the exact piece you are looking at.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-4 px-5 pb-16 sm:grid-cols-2 sm:px-10 lg:px-16">
        {cards.map((card) => (
          <div key={card.title} className="border border-[#ddd3ca] bg-white p-7 sm:p-9">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1e7de]">
              {card.icon}
            </span>
            <h2 className="mt-5 font-display text-xl text-[#241a17] sm:text-2xl">{card.title}</h2>
            <div className="mt-3 space-y-1">
              {card.lines.map((line) => (
                <p key={line} className="text-sm leading-7 text-[#74665e]">
                  {line}
                </p>
              ))}
            </div>
            {card.action && (
              <a
                href={card.action.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-11 items-center gap-2 bg-[#241a17] px-6 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6B1D35]"
              >
                {card.title.includes('Visit') ? <Navigation size={14} /> : <MessageCircle size={14} />}
                {card.action.label}
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
