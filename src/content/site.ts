/**
 * Business details. Edit here — every page reads from this file.
 * Items marked `confirmed: false` are hidden or flagged until the owner confirms them.
 */
export const SITE = {
  /** Website display name — confirm with owner (logo reads "Satish Enterprise and Full House"). */
  displayName: "Satish Enterprises",
  tagline: "Granites · Tiles · Quartz · Sanitaryware",
  phoneDisplay: "+91 86397 51848",
  phoneHref: "tel:+918639751848",
  address: "Edarapalli Brg Byp Rd, Amalapuram, Andhra Pradesh 533201, India",
  plusCode: "H2P2+PM Amalapuram, Andhra Pradesh, India",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=H2P2%2BPM%20Amalapuram%2C%20Andhra%20Pradesh%2C%20India",
  /** Enable only after the owner confirms this number accepts WhatsApp business messages. */
  whatsapp: {
    enabled: false,
    number: "918639751848",
    defaultMessage:
      "Hello Satish Enterprises, I would like to enquire about your granites, tiles, quartz, and sanitaryware.",
  },
  /** Leave empty until the owner supplies real accounts. */
  socials: [] as { label: string; href: string }[],
  /** Opening hours stay unpublished until the "Permanently closed" listing is resolved. */
  openingHours: null as string | null,
  /** Owner-confirmed services. Keep false until confirmed. */
  services: { delivery: false, installation: false, siteMeasurement: false, showroomVisits: false },
};

export function whatsappLink(message = SITE.whatsapp.defaultMessage) {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
