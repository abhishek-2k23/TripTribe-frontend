/**
 * Legal copy for the Privacy Policy, Terms of Service and account-deletion page.
 *
 * Kept word-for-word in sync with trip-planner-mobile/src/content/legal.ts — the stores check
 * that the in-app text matches the published pages. Change both together.
 *
 * This is a starting point written against how Trip Tribe actually handles data (Clerk sign-in,
 * MongoDB, Cloudinary, the deletion flow in Backend/controllers/account.controller.js). Have it
 * reviewed before publishing, and set LEGAL_CONTACT_EMAIL.
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

const EFFECTIVE_DATE = "14 September 2026";

export const DELETION_EFFECTS: string[] = [
  "Your sign-in account is removed, and your profile is renamed \"Deleted user\" with your email and photo erased.",
  "Your discussion messages, activity comments, checklist ticks and the files you uploaded are deleted.",
  "Trips where you are the only member are deleted, along with everything in them.",
  "In trips you own that have other members, ownership passes to the longest-standing editor (or member, if there are no editors).",
  "Expenses you paid for or shared stay in those trips, shown as \"Deleted user\", so the group's balances stay correct.",
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
      bullets: [
        "Account details from Google sign-in, handled by Clerk: your name, email address, profile photo and a sign-in account ID.",
        "Content you add to trips: trip details, itinerary activities and comments, checklists, expenses and budgets, discussion messages, and files or photos you upload.",
        "Technical information needed to run the service, such as your IP address (used for rate limiting and security logs) and basic device information sent when the app checks for updates.",
      ],
      paragraphs: [
        "We only access your camera, photos or files when you choose to add something, and only the item you pick is uploaded.",
      ],
    },
    {
      heading: "How we use it",
      bullets: [
        "To provide Trip Tribe and keep your trips in sync with the other members.",
        "To sign you in and keep your account secure.",
        "To troubleshoot problems and keep the service running.",
      ],
      paragraphs: ["We don't sell your information, show ads, or use third-party analytics."],
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
        "Cloudinary, for storing uploaded files and images.",
        "Our MongoDB database host, for storing trip data.",
        "Expo, for delivering app updates.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep your information while your account is active. When you delete your account, your data is deleted or anonymized straight away as described below. Copies may remain in backups kept by our providers for a limited time before they are overwritten.",
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
        "Download a copy of your data in the app (Account → Export my data).",
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
      paragraphs: [`Questions or requests about your privacy: ${LEGAL_CONTACT_EMAIL}`],
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
      paragraphs: ["You must be at least 13 years old to use Trip Tribe."],
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
      ],
    },
    {
      heading: "Trips and invite codes",
      paragraphs: [
        "Trip owners decide who can edit a trip. Anyone with a trip's invite code can join it, so share codes only with people you trust.",
      ],
    },
    {
      heading: "Expenses and balances",
      paragraphs: [
        "Budgets, expenses and balances are a tracking tool. Trip Tribe doesn't process payments, and we aren't responsible for settling debts between members.",
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
        "To the extent the law allows, we aren't liable for indirect or consequential losses, or for travel arrangements, bookings or payments made using information in Trip Tribe.",
      ],
    },
    {
      heading: "Ending your account",
      paragraphs: [
        "You can delete your account at any time; the Privacy Policy explains what happens to your data. We may suspend accounts that break these terms.",
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
      paragraphs: [`Questions about these terms: ${LEGAL_CONTACT_EMAIL}`],
    },
  ],
};
