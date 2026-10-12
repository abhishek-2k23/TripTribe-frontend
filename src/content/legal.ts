/**
 * Legal copy for the Privacy Policy, Terms of Service and account-deletion page.
 *
 * Kept word-for-word in sync with trip-planner-mobile/src/content/legal.ts — the stores check
 * that the in-app text matches the published pages. Change both together.
 *
 * This is a starting point written against how Trip Tribe actually handles data (Clerk sign-in,
 * MongoDB, Cloudinary, Anthropic for AI, Google Maps Platform, RevenueCat, the deletion flow in
 * Backend/controllers/account.controller.js). Have it reviewed before publishing, and set
 * LEGAL_CONTACT_EMAIL.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
}

/** TODO before publishing: replace with a real support/privacy inbox. */
export const LEGAL_CONTACT_EMAIL = "[set LEGAL_CONTACT_EMAIL before publishing]";

const EFFECTIVE_DATE = "4 October 2026";

/** Shown with AI output, as the store review guidelines and our Terms ("AI features") expect. */
export const AI_PLAN_DISCLAIMER =
  "AI-generated with Google Maps data. Opening hours, prices and travel times can be wrong — check before you book.";
export const AI_CHAT_DISCLAIMER = "AI answers can be wrong. Check anything important before you rely on it.";
export const AI_RECEIPT_DISCLAIMER = "Read by AI — check the amount, date and category before you save.";
export const AI_PACKING_DISCLAIMER =
  "Suggested by AI from your trip's destination, dates and weather. Adjust it for your group.";

export const DELETION_EFFECTS: string[] = [
  "Your sign-in account is removed, and your profile is renamed \"Deleted user\" with your email and photo erased.",
  "Your discussion messages, activity comments, checklist ticks and the files you uploaded are deleted.",
  "Your AI conversations, the AI plans you asked for and your notification registrations are deleted.",
  "Trips where you are the only member are deleted, along with everything in them.",
  "In trips you own that have other members, ownership passes to the longest-standing editor (or member, if there are no editors).",
  "Expenses you paid for or shared stay in those trips, shown as \"Deleted user\", so the group's balances stay correct.",
  "Credits you hold are forfeited and aren't refunded. Credits already added to a trip's shared pool stay with that trip.",
  "This can't be undone.",
];

export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate: EFFECTIVE_DATE,
  intro:
    "Trip Tribe helps groups plan trips together. This policy explains what information we collect, how we use it, who can see it, and the choices you have.",
  sections: [
    {
      heading: "Information we collect",
      paragraphs: [
        "We only access your camera, photos or files when you choose to add something, and only the item you pick is uploaded.",
      ],
      bullets: [
        "Account details from Google sign-in, handled by Clerk: your name, email address, profile photo and a sign-in account ID.",
        "Content you add to trips: trip details, itinerary activities and comments, checklists, expenses and budgets, discussion messages, and files or photos you upload.",
        "What you ask Trip Tribe's AI features: chat messages, trip plan requests and receipt photos you choose to scan.",
        "Places you search for or add to an itinerary.",
        "If you allow notifications, a push token that lets us send them to your device.",
        "If you buy credits, a record of the purchase from the App Store or Google Play. We never see your payment card details.",
        "Technical information needed to run the service, such as your IP address (used for rate limiting and security logs) and basic device information sent when the app checks for updates.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We don't sell your information, show ads, or use third-party analytics. We don't use your content to train AI models.",
      ],
      bullets: [
        "To provide Trip Tribe and keep your trips in sync with the other members.",
        "To answer AI requests: drafting itineraries, suggesting packing lists, reading receipts and answering questions about your trip.",
        "To show maps, places, travel times and weather for your trips.",
        "To notify you about changes to your trips and about finished AI plans.",
        "To keep your credit balance, and to record purchases, refunds and restores.",
        "To sign you in and keep your account secure.",
        "To troubleshoot problems and keep the service running.",
      ],
    },
    {
      heading: "AI features",
      paragraphs: [
        "When you use an AI feature, we send Anthropic, the company that provides the AI model, what it needs to answer: your message or request, and details of the trip it's about (its name, destination, dates, number of travellers, budget, itinerary and checklist). Receipt photos you scan are sent too. We don't send members' names or email addresses.",
        "AI plans are proposals. Nothing is added to a trip until a member who can edit it accepts the plan, and accepted activities are visible to everyone in the trip.",
        "AI output can be wrong. Treat itineraries, opening hours, prices and travel times as suggestions and check them before you book or travel.",
      ],
    },
    {
      heading: "Who can see it",
      paragraphs: [
        "Everything you add to a trip is visible to that trip's members. Anyone with a trip's invite code can join it as a viewer, so share codes only with people you trust.",
        "We use service providers who process data only to provide their service to us:",
      ],
      bullets: [
        "Clerk, for sign-in and account management.",
        "Google, when you sign in with your Google account.",
        "Anthropic, for the AI features described above.",
        "Google Maps Platform, for place search, maps, place photos and travel times. Your searches and the locations of your trips and activities are sent to Google.",
        "Open-Meteo, for weather forecasts. It receives your trip's location and dates.",
        "RevenueCat, Apple and Google, for credit purchases and restoring them. RevenueCat receives your Trip Tribe account ID, not your name or email.",
        "Cloudinary, for storing uploaded files and images.",
        "Our MongoDB database host, for storing trip data, and our server host, for running the service.",
        "Expo, for delivering app updates and push notifications, which Apple and Google pass on to your device.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep your information while your account is active. When you delete your account, your data is deleted or anonymized straight away as described below. Copies may remain in backups kept by our providers for a limited time before they are overwritten.",
        "AI conversations are kept until you delete them (Plan with AI → press and hold a conversation) or delete your account. Receipt photos are deleted as soon as they've been read, and within an hour at most. AI plans belong to the trip they were made for and are kept with it.",
        "Push tokens are kept until you sign out, delete your account, or your device stops accepting notifications.",
      ],
    },
    {
      heading: "Stored on your device",
      paragraphs: [
        "So the app keeps working without a signal, it stores a copy of your recent trip data on your device for up to 7 days, along with changes waiting to sync. Files you choose to save for offline use are stored on the device too, up to 200 MB. All of it is removed when you sign out or delete your account, and a trip's data is removed when you leave it or are removed from it.",
      ],
    },
    {
      heading: "Deleting your account",
      paragraphs: [
        "You can delete your account at any time in the app (Account → Delete account) or on the web at /delete-account. Deleting your account means:",
      ],
      bullets: DELETION_EFFECTS,
    },
    {
      heading: "Your choices",
      bullets: [
        "Edit your display name and photo in the app (Account → Edit profile).",
        "Download a copy of your data, including your AI conversations and credit history, in the app (Account → Export my data).",
        "Delete an AI conversation (Plan with AI → press and hold it).",
        "Turn notifications off in your device settings.",
        "Contact us to ask about, correct or delete your information.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "Trip Tribe isn't directed at children under 13, and we don't knowingly collect their information.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "Data is sent over encrypted connections and sign-in is handled by Clerk. No system is perfectly secure, so please keep your Google account protected.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If we change this policy we'll update the effective date above. For significant changes we'll also let you know in the app.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions or requests about your privacy: ${LEGAL_CONTACT_EMAIL}`,
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  title: "Terms of Service",
  effectiveDate: EFFECTIVE_DATE,
  intro:
    "These terms apply when you use Trip Tribe on the web or in the app. By creating an account or using Trip Tribe, you agree to them.",
  sections: [
    {
      heading: "Using Trip Tribe",
      paragraphs: [
        "You must be at least 13 years old to use Trip Tribe.",
      ],
    },
    {
      heading: "Your account",
      paragraphs: [
        "You sign in with your Google account. You're responsible for activity on your Trip Tribe account and for keeping your Google account secure.",
      ],
    },
    {
      heading: "Your content",
      paragraphs: [
        "You keep ownership of what you add. You give us permission to store it and show it to the members of the trips you add it to, only as needed to run the service. Don't upload anything you don't have the right to share.",
      ],
    },
    {
      heading: "Acceptable use",
      bullets: [
        "Don't post unlawful, harmful or abusive content, or harass other members.",
        "Don't try to access trips you weren't invited to, or to disrupt or overload the service.",
        "Don't share other people's personal documents without their permission.",
        "Don't use the AI features to produce unlawful or harmful content, or try to make them do something they aren't meant for.",
      ],
    },
    {
      heading: "Trips and invite codes",
      paragraphs: [
        "Trip owners decide who can edit a trip. Anyone with a trip's invite code can join it, so share codes only with people you trust.",
      ],
    },
    {
      heading: "AI features",
      paragraphs: [
        "Trip Tribe's AI features suggest itineraries, packing lists, expense details from receipts, and answers to your questions. These suggestions are generated automatically and can be inaccurate or out of date: opening hours, prices, routes, travel times and availability may be wrong.",
        "Check suggestions yourself before you book, pay or travel, and don't rely on them for safety, health, legal or visa decisions. AI plans are only added to a trip when a member accepts them.",
      ],
    },
    {
      heading: "Credits",
      bullets: [
        "AI features cost credits. Every account gets a free monthly allowance, which doesn't carry over to the next month.",
        "You can buy credit packs or a monthly subscription in the app. Purchases are made through the App Store or Google Play under their terms. Subscriptions renew automatically until you cancel them in your store account settings.",
        "Credits have no cash value. They're non-refundable, except where the law or the store's refund policy requires a refund. If the store refunds a purchase, we remove the credits it added.",
        "Credits can't be transferred, sold or exchanged. The one exception: a trip owner can add purchased credits to the trip's shared pool, for the AI requests of that trip's owners and editors.",
        "If an AI request fails or can't be completed, the credits it used are returned.",
        "Credits are forfeited when you delete your account.",
        "The price of credits and the number each AI feature costs are shown in the app and may change. Changes don't affect credits you already hold.",
      ],
    },
    {
      heading: "Expenses and balances",
      paragraphs: [
        "Budgets, expenses and balances are a tracking tool. Trip Tribe doesn't move money between members, and we aren't responsible for settling debts between them.",
      ],
    },
    {
      heading: "Availability",
      paragraphs: [
        "We work to keep Trip Tribe running, but it's provided as is, without warranties of any kind. We may change or discontinue features.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "To the extent the law allows, we aren't liable for indirect or consequential losses, or for travel arrangements, bookings or payments made using information in Trip Tribe, including AI suggestions.",
      ],
    },
    {
      heading: "Ending your account",
      paragraphs: [
        "You can delete your account at any time; the Privacy Policy explains what happens to your data, and any credits you hold are forfeited. We may suspend accounts that break these terms.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "If we change these terms we'll update the effective date above. Continuing to use Trip Tribe after a change means you accept the updated terms.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about these terms: ${LEGAL_CONTACT_EMAIL}`,
      ],
    },
  ],
};
