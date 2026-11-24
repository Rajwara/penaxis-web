/**
 * Penaxis policies, as structured data for /policies/[slug].
 *
 * The text is copied word for word from the existing pages
 * app/privacy-policy/page.tsx and app/terms-conditions/page.tsx (all
 * sections, headings, lists and dates). If either policy changes, update
 * both places. Section numbers come from the order here, so titles carry
 * no "1." prefix. `intro` is each page's existing meta description;
 * `lead` holds the unheaded opening paragraphs. `points` are short
 * summaries of what the policy text itself says (no new commitments).
 */

/** Inline run inside a paragraph: plain text, bold lead-in, link or line break. */
export type Inline = string | { b: string } | { a: string; href: string } | { br: true };
export type PolicyBlock = string | { p: Inline[] } | { h3: string } | { list: string[] };
export type PolicySection = { id: string; title: string; body: PolicyBlock[] };
export type PolicyIcon = "shield" | "lock" | "user" | "file" | "chart";
export type Policy = {
  slug: string;
  tab: string;
  title: string;
  intro: string;
  updated: string; // ISO date
  lead: PolicyBlock[];
  points: { icon: PolicyIcon; title: string; text: string }[];
  sections: PolicySection[];
};

export const POLICIES: Policy[] = [
  {
    slug: "privacy",
    tab: "Privacy Policy",
    title: "Privacy Policy",
    intro: "How Penaxis collects, uses, and protects information.",
    updated: "2026-08-07",
    lead: [
      "Penaxis (Private) Limited (\"Penaxis,\" \"we,\" \"us,\" or \"our\") respects your privacy and is committed to handling personal information responsibly, transparently and securely.",
      "This Privacy Policy explains how we collect, use, disclose and protect personal information when you visit penaxis.com, contact us, book a consultation, submit an enquiry, apply for an opportunity with us, engage our services, or otherwise interact with Penaxis.",
      "It also explains the choices and rights that may be available to you under applicable data-protection laws."
    ],
    points: [
      {
        icon: "user",
        title: "What we collect",
        text: "Contact, company and project details you share with us, plus information collected automatically when you visit our website."
      },
      {
        icon: "shield",
        title: "Never sold",
        text: "Penaxis does not sell personal information as a business model or for monetary consideration."
      },
      {
        icon: "lock",
        title: "Your rights",
        text: "Depending on where you live, you may ask to access, correct or delete your information. Contact us to exercise a right."
      }
    ],
    sections: [
      {
        id: "who-we-are",
        title: "Who We Are",
        body: [
          "Penaxis is a technology and business growth company providing services including software and product development, AI and business automation, CRM solutions, technology consulting, business development, lead generation, marketing and related professional services.",
          "For personal information collected directly by Penaxis for our own business purposes, Penaxis generally acts as the data controller or equivalent responsible party.",
          "Where we process personal information on behalf of a client-for example, while operating a CRM, developing or maintaining a platform, supporting an outreach campaign or providing another managed service-we may act as a data processor or service provider. In those circumstances, the relevant client determines how and why that information is processed, and their privacy notice may apply."
        ]
      },
      {
        id: "information-we-may-collect",
        title: "Information We May Collect",
        body: [
          "The information we collect depends on how you interact with us.",
          {
            h3: "Information you provide to us"
          },
          "We may collect information such as:",
          {
            list: [
              "Your name, email address, telephone number and other contact details",
              "Company name, job title and professional information",
              "Information submitted through contact, enquiry or consultation forms",
              "Information you provide when discussing a project or requesting a proposal",
              "Communications exchanged with us by email, telephone, messaging platforms, social media or other channels",
              "Billing, invoicing and transaction-related information",
              "Information contained in documents or files that you voluntarily provide to us",
              "Recruitment information, such as CVs, portfolios, employment history and other information submitted when applying to work with Penaxis"
            ]
          },
          "We ask that you do not provide sensitive personal information unless it is genuinely necessary for a particular interaction or service.",
          {
            h3: "Information collected automatically"
          },
          "When you visit our website, certain information may be collected automatically, including:",
          {
            list: [
              "IP address",
              "Browser and device information",
              "Operating system",
              "Pages visited",
              "Referring pages or websites",
              "Approximate geographic location",
              "Date, time and duration of visits",
              "Website interactions and performance information",
              "Cookie and similar technology identifiers"
            ]
          },
          "This information helps us operate, secure and improve our website and understand how visitors interact with it.",
          {
            h3: "Business information obtained from other sources"
          },
          "As part of our B2B operations, we may also obtain professional or business contact information from sources such as:",
          {
            list: [
              "Publicly available company websites",
              "Professional networks and business directories",
              "Public business records",
              "Referrals and business partners",
              "Reputable third-party business information providers"
            ]
          },
          "Such information may include a person’s name, professional role, company, business email address, professional profile or other information relevant to a legitimate business relationship.",
          "We use this information only where permitted under applicable law."
        ]
      },
      {
        id: "how-we-use-personal-information",
        title: "How We Use Personal Information",
        body: [
          "We may use personal information to:",
          {
            list: [
              "Respond to enquiries and consultation requests",
              "Understand your business requirements",
              "Prepare proposals, estimates and statements of work",
              "Provide and manage our services",
              "Communicate with clients and prospective clients",
              "Manage contracts, invoices, payments and business records",
              "Develop, maintain and support software, digital products and technology solutions",
              "Provide CRM, automation, marketing, lead-generation and business-development services",
              "Personalize and improve our website and services",
              "Measure website performance and understand visitor behaviour",
              "Conduct legitimate B2B sales and business-development activities",
              "Send marketing or business communications where permitted",
              "Manage recruitment and employment applications",
              "Protect our systems, employees, clients and business from fraud, abuse or security threats",
              "Establish, exercise or defend legal claims",
              "Comply with applicable legal, regulatory, tax and accounting obligations",
              "Maintain records necessary for our business operations"
            ]
          },
          "We will not use personal information for purposes that are materially incompatible with the purposes for which it was collected unless permitted by law or we provide appropriate notice."
        ]
      },
      {
        id: "legal-bases-for-processing",
        title: "Legal Bases for Processing",
        body: [
          "Where applicable data-protection law requires us to identify a legal basis for processing personal information, we may rely on one or more of the following:",
          {
            p: [
              {
                b: "Contractual necessity"
              },
              " - where processing is necessary to provide services you have requested or to take steps before entering into a contract."
            ]
          },
          {
            p: [
              {
                b: "Legitimate interests"
              },
              " - where processing is reasonably necessary for legitimate business purposes, such as responding to business enquiries, managing client relationships, improving our services, maintaining security and conducting appropriate B2B business development, provided those interests are not overridden by your rights."
            ]
          },
          {
            p: [
              {
                b: "Consent"
              },
              " - where you have given us permission for a particular activity, such as certain marketing communications or non-essential cookies where consent is required."
            ]
          },
          {
            p: [
              {
                b: "Legal obligations"
              },
              " - where we need to process information to comply with applicable laws, regulatory requirements, court orders, taxation requirements or other legal obligations."
            ]
          },
          "Where we rely on consent, you may withdraw that consent at any time, subject to applicable law."
        ]
      },
      {
        id: "business-development-and-marketing-communications",
        title: "Business Development and Marketing Communications",
        body: [
          "Penaxis works primarily in a business-to-business environment.",
          "We may contact individuals in their professional capacity where we reasonably believe our services may be relevant to their organisation and where such communication is permitted by applicable law.",
          "Business-development information may come from information provided directly to us, professional networks, company websites, business directories, referrals or reputable third-party sources.",
          "You may ask us to stop sending marketing or business-development communications at any time by using an unsubscribe mechanism where provided or by contacting us directly.",
          "We will honour valid marketing opt-out requests and may retain limited information necessary to ensure that your preference continues to be respected."
        ]
      },
      {
        id: "cookies-and-similar-technologies",
        title: "Cookies and Similar Technologies",
        body: [
          "Our website may use cookies and similar technologies to operate correctly, remember preferences, understand website usage, improve performance and, where applicable, support marketing activities.",
          "Cookies may include:",
          {
            p: [
              {
                b: "Essential cookies"
              },
              " required for the website to operate or provide requested functionality."
            ]
          },
          {
            p: [
              {
                b: "Analytics cookies"
              },
              " that help us understand how visitors use the website and identify opportunities for improvement."
            ]
          },
          {
            p: [
              {
                b: "Functional cookies"
              },
              " that remember choices or provide enhanced functionality."
            ]
          },
          {
            p: [
              {
                b: "Marketing cookies"
              },
              ", where used, that may help measure campaigns or deliver more relevant marketing."
            ]
          },
          "Where required by law, non-essential cookies will only be activated after obtaining the appropriate consent.",
          "You can manage cookies through the consent controls provided on our website, where available, or through your browser settings.",
          "UK privacy guidance specifically requires website visitors to be informed about cookies and generally requires agreement before non-essential cookies are used."
        ]
      },
      {
        id: "how-we-share-personal-information",
        title: "How We Share Personal Information",
        body: [
          "We do not sell personal information as a business model.",
          "We may disclose personal information where reasonably necessary to the following categories of recipients:",
          {
            h3: "Service providers"
          },
          "We may use trusted third-party providers for services such as:",
          {
            list: [
              "Website and cloud hosting",
              "Email and business communications",
              "CRM and sales-management systems",
              "Analytics",
              "Project management",
              "Scheduling",
              "Payment and invoicing",
              "Cybersecurity",
              "Data storage and backup",
              "Marketing and communications",
              "Professional and technical services"
            ]
          },
          "These providers may process information only as necessary to perform services for us and subject to appropriate contractual or legal requirements.",
          {
            h3: "Professional advisers"
          },
          "We may share information with lawyers, accountants, auditors, insurers, consultants and other professional advisers where reasonably necessary.",
          {
            h3: "Clients"
          },
          "Where Penaxis provides services on behalf of a client, information may be processed or shared according to that client’s documented instructions and our contractual obligations to them.",
          {
            h3: "Legal and regulatory authorities"
          },
          "We may disclose information where reasonably necessary to comply with applicable law, regulation, legal process or lawful governmental request, or to protect our legal rights, users, employees or others.",
          {
            h3: "Corporate transactions"
          },
          "If Penaxis is involved in a merger, acquisition, restructuring, financing, sale of assets or similar corporate transaction, information may be disclosed to relevant parties subject to appropriate confidentiality and legal safeguards."
        ]
      },
      {
        id: "client-data-and-services-provided-on-behalf-of-clients",
        title: "Client Data and Services Provided on Behalf of Clients",
        body: [
          "This distinction is particularly important for our services.",
          "Clients may provide Penaxis with access to personal information as part of software development, CRM implementation, automation, marketing, lead generation, business-development or other services.",
          "When Penaxis processes such information solely on behalf of a client, the client generally remains responsible for determining the purpose and means of processing.",
          "In these circumstances:",
          {
            list: [
              "We process personal information according to the client’s instructions and our contractual obligations.",
              "The client’s privacy policy normally governs its relationship with the individuals concerned.",
              "Requests concerning that data may need to be directed to the relevant client.",
              "Where appropriate, Penaxis will assist clients in responding to legitimate privacy requests."
            ]
          },
          "Our client agreements or data-processing agreements may contain additional privacy and security requirements."
        ]
      },
      {
        id: "international-data-transfers",
        title: "International Data Transfers",
        body: [
          "Penaxis operates with clients, service providers and business partners in different countries.",
          "As a result, personal information may be processed in a country other than the country in which it was originally collected.",
          "Where applicable law restricts international transfers of personal information, we take reasonable steps to use appropriate legal and contractual safeguards, which may include contractual protections, approved transfer mechanisms or other safeguards permitted under applicable law.",
          "The UAE Personal Data Protection Law, for example, specifically establishes requirements for cross-border transfer and sharing of personal information."
        ]
      },
      {
        id: "data-security",
        title: "Data Security",
        body: [
          "We take reasonable administrative, organisational and technical measures designed to protect personal information against:",
          {
            list: [
              "Unauthorised access",
              "Loss",
              "Misuse",
              "Alteration",
              "Disclosure",
              "Destruction"
            ]
          },
          "Our safeguards may include access controls, authentication measures, secure infrastructure, restricted permissions, backup procedures and other security controls appropriate to the nature of the information involved.",
          "However, no internet transmission, electronic storage system or security measure can guarantee absolute security."
        ]
      },
      {
        id: "data-retention",
        title: "Data Retention",
        body: [
          "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including to:",
          {
            list: [
              "Deliver and support our services",
              "Maintain client and business relationships",
              "Maintain appropriate business and financial records",
              "Comply with legal, accounting, taxation and regulatory obligations",
              "Resolve disputes",
              "Enforce agreements",
              "Maintain security and prevent abuse"
            ]
          },
          "Different categories of information may therefore be retained for different periods.",
          "When information is no longer reasonably required, we may delete, anonymise or securely archive it in accordance with applicable legal and operational requirements."
        ]
      },
      {
        id: "your-privacy-rights",
        title: "Your Privacy Rights",
        body: [
          "Depending on where you live and the laws applicable to the processing of your information, you may have rights to:",
          {
            list: [
              "Request access to personal information we hold about you",
              "Request correction of inaccurate or incomplete information",
              "Request deletion of your personal information",
              "Request restriction of certain processing",
              "Object to certain processing",
              "Receive certain information in a portable format",
              "Withdraw consent where processing is based on consent",
              "Object to or opt out of direct marketing",
              "Ask for information about how your data is collected, used or shared",
              "Lodge a complaint with an appropriate data-protection or regulatory authority"
            ]
          },
          "These rights are subject to applicable legal requirements and exceptions.",
          "GDPR and UK GDPR frameworks provide rights including access, rectification, erasure, restriction, portability, objection and withdrawal of consent. UAE law similarly provides rights relating to correction and stopping certain processing, including direct marketing.",
          "To exercise a privacy right, contact us using the details below.",
          "We may need to verify your identity before completing certain requests."
        ]
      },
      {
        id: "california-and-other-u-s-privacy-rights",
        title: "California and Other U.S. Privacy Rights",
        body: [
          "Residents of certain U.S. states may have additional privacy rights where the relevant law applies to Penaxis or a particular processing activity.",
          "These may include rights to know or access personal information, request deletion or correction, obtain a copy of information and opt out of certain forms of sale, sharing, targeted advertising or profiling.",
          "Penaxis does not sell personal information for monetary consideration.",
          "Where an applicable law provides additional rights, we will process valid requests in accordance with that law.",
          "California law, for businesses to which it applies, provides rights including access/knowledge, deletion, correction, opt-out of sale or sharing and protection from discrimination for exercising privacy rights."
        ]
      },
      {
        id: "artificial-intelligence-and-automated-tools",
        title: "Artificial Intelligence and Automated Tools",
        body: [
          "Because some of our services and business processes may involve AI-enabled technologies, we may use automated or AI-assisted tools to support activities such as analysis, workflow automation, software development, communications or service delivery.",
          "Where personal information is processed using such technologies, we aim to apply appropriate privacy, confidentiality and security safeguards.",
          "Unless specifically disclosed otherwise, we do not use personal information collected through our website to make solely automated decisions that produce legal or similarly significant effects on individuals."
        ]
      },
      {
        id: "third-party-websites-and-services",
        title: "Third-Party Websites and Services",
        body: [
          "Our website may contain links to websites, platforms or services operated by third parties.",
          "Penaxis is not responsible for the privacy practices, security or content of those third parties. We encourage you to review their privacy policies before providing personal information to them."
        ]
      },
      {
        id: "childrens-privacy",
        title: "Children’s Privacy",
        body: [
          "Our website and services are intended primarily for businesses and professionals and are not directed toward children.",
          "We do not knowingly collect personal information from children through our website for marketing or commercial purposes.",
          "If you believe that a child has provided personal information to us inappropriately, please contact us so that we can review and, where appropriate, delete the information."
        ]
      },
      {
        id: "changes-to-this-privacy-policy",
        title: "Changes to This Privacy Policy",
        body: [
          "We may update this Privacy Policy periodically to reflect changes in our services, technology, business practices or legal obligations.",
          "When we make changes, we will update the “Last updated” date at the top of this page.",
          "Where changes materially affect how we use personal information, we may provide additional notice where required by applicable law."
        ]
      },
      {
        id: "contact-us",
        title: "Contact Us",
        body: [
          "If you have questions about this Privacy Policy, how Penaxis handles personal information, or wish to exercise a privacy right, you can contact us at:",
          {
            p: [
              "Penaxis (Private) Limited",
              {
                br: true
              },
              "2nd Floor, Building #3, P Block, Phase 11",
              {
                br: true
              },
              "DHA Rahbar, Lahore, Pakistan",
              {
                br: true
              },
              "Email: ",
              {
                a: "info@penaxis.com",
                href: "mailto:info@penaxis.com"
              },
              {
                br: true
              },
              "Phone: +92 317 4731492",
              {
                br: true
              },
              "Website: penaxis.com"
            ]
          }
        ]
      }
    ]
  },
  {
    slug: "terms",
    tab: "Terms & Conditions",
    title: "Terms & Conditions",
    intro: "The terms governing use of the Penaxis website and services.",
    updated: "2026-08-07",
    lead: [
      "Welcome to Penaxis.",
      "These Terms & Conditions (“Terms”) govern your access to and use of penaxis.com (the “Website”), operated by Penaxis (Private) Limited (“Penaxis,” “we,” “us,” or “our”).",
      "By accessing or using this Website, you agree to these Terms. If you do not agree with them, please do not use the Website.",
      "These Terms relate primarily to your use of our Website. Any services provided by Penaxis are subject to the applicable proposal, statement of work, service agreement, master services agreement or other written agreement between Penaxis and the client."
    ],
    points: [
      {
        icon: "file",
        title: "Website use",
        text: "These Terms cover penaxis.com. Our services are governed by the written agreement between Penaxis and each client."
      },
      {
        icon: "chart",
        title: "No guaranteed results",
        text: "Unless agreed in writing, we don't guarantee a particular number of leads, sales, revenue or other commercial outcome."
      },
      {
        icon: "lock",
        title: "Client IP by contract",
        text: "Ownership of software, designs and other deliverables built for a client is set by the relevant client agreement."
      }
    ],
    sections: [
      {
        id: "about-penaxis",
        title: "About Penaxis",
        body: [
          "Penaxis is a technology and growth company providing services that may include software and product development, artificial intelligence solutions, business automation, CRM solutions, websites and digital platforms, technology consulting, marketing, lead generation, business development and related professional services.",
          "Information presented on this Website is intended to provide a general overview of Penaxis, our capabilities and the services we may offer.",
          "Nothing on this Website obligates Penaxis to accept a project, provide a particular service or enter into a commercial relationship."
        ]
      },
      {
        id: "use-of-the-website",
        title: "Use of the Website",
        body: [
          "You may use this Website only for lawful purposes and in accordance with these Terms.",
          "You agree not to:",
          {
            list: [
              "Use the Website in violation of any applicable law or regulation",
              "Attempt to gain unauthorised access to the Website, our systems or connected infrastructure",
              "Introduce viruses, malware, malicious code or other harmful material",
              "Interfere with the security, availability or proper operation of the Website",
              "Impersonate another person or misrepresent your identity or affiliation",
              "Use automated systems to excessively crawl, scrape or extract Website content without our permission",
              "Copy or commercially exploit Website content in violation of our intellectual-property rights",
              "Use the Website to transmit unlawful, fraudulent, abusive or infringing material",
              "Attempt to reverse engineer or circumvent security measures associated with the Website"
            ]
          },
          "We may restrict or terminate access to the Website where we reasonably believe these Terms have been violated or where necessary to protect Penaxis, our users or our systems."
        ]
      },
      {
        id: "website-information",
        title: "Website Information",
        body: [
          "We make reasonable efforts to ensure that information presented on the Website is useful and accurate.",
          "However, technology, service offerings, availability, pricing, team composition, project timelines and other business information may change.",
          "Website content is therefore provided for general informational purposes and should not be treated as a binding quotation, contractual commitment, warranty or guarantee.",
          "If there is any conflict between information on this Website and a written agreement entered into between you and Penaxis, the written agreement will prevail."
        ]
      },
      {
        id: "enquiries-consultations-and-proposals",
        title: "Enquiries, Consultations and Proposals",
        body: [
          "Submitting a contact form, booking a consultation, requesting a quotation or communicating with Penaxis through this Website does not by itself create a client relationship or contractual obligation.",
          "Any proposed:",
          {
            list: [
              "Scope of work",
              "Deliverables",
              "Project timeline",
              "Pricing",
              "Payment terms",
              "Intellectual-property ownership",
              "Support obligations",
              "Performance requirements",
              "Service levels",
              "Confidentiality obligations"
            ]
          },
          "will be governed by the relevant written proposal, statement of work, agreement or other contract accepted by Penaxis and the client.",
          "Quotes and proposals may also be subject to validity periods and other conditions stated in the relevant document."
        ]
      },
      {
        id: "services-and-client-engagements",
        title: "Services and Client Engagements",
        body: [
          "Penaxis may provide different services to different clients, and the nature of each engagement can vary significantly.",
          "For that reason, descriptions of services on this Website are illustrative and do not guarantee that every feature, technology, deliverable, timeline or commercial arrangement will apply to every project.",
          "Specific client engagements may be subject to separate terms concerning matters such as:",
          {
            list: [
              "Scope and deliverables",
              "Development milestones",
              "Revisions and change requests",
              "Client responsibilities",
              "Third-party services",
              "Payment schedules",
              "Intellectual-property ownership",
              "Confidentiality",
              "Data processing",
              "Hosting and maintenance",
              "Acceptance testing",
              "Warranties",
              "Service levels",
              "Termination"
            ]
          },
          "The applicable signed or otherwise validly accepted agreement will govern those matters."
        ]
      },
      {
        id: "no-guarantee-of-commercial-results",
        title: "No Guarantee of Commercial Results",
        body: [
          "Some Penaxis services may relate to marketing, sales, lead generation, business development, market entry, automation or other activities intended to improve business performance.",
          "Business outcomes depend on numerous factors beyond Penaxis’s control, including market conditions, pricing, competition, client responsiveness, product quality, sales processes and third-party platforms.",
          "Unless expressly stated in a written agreement, Penaxis does not guarantee any particular number of leads, customers, sales, revenue, conversions, market share or other commercial outcome.",
          "Similarly, examples, case studies, testimonials and previous project results displayed on the Website should not be interpreted as guarantees that another client will achieve the same results."
        ]
      },
      {
        id: "software-ai-and-technology-information",
        title: "Software, AI and Technology Information",
        body: [
          "Information on this Website relating to software, artificial intelligence, automation, integrations or other technologies is provided for general informational purposes.",
          "Actual functionality, system architecture, integrations, performance and technical requirements will depend on the individual project.",
          "AI-enabled systems can produce inaccurate, incomplete or unexpected outputs and may depend on third-party models, APIs, platforms or datasets.",
          "Unless otherwise agreed in writing, demonstrations, prototypes, mock-ups, concepts and examples displayed on the Website are illustrative and should not be relied upon as production systems or guarantees of future functionality."
        ]
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property",
        body: [
          "Unless otherwise stated, the Website and its original content-including its design, text, graphics, branding, logos, illustrations, videos, animations, software, layouts and other materials-are owned by or licensed to Penaxis and are protected by applicable intellectual-property laws.",
          "You may view and use the Website for legitimate personal or internal business purposes.",
          "You may not, without our prior written permission:",
          {
            list: [
              "Reproduce substantial portions of the Website",
              "Republish Website content",
              "Modify or create derivative works from protected Website content",
              "Sell, sublicense or commercially exploit our content",
              "Use Penaxis trademarks, branding or logos in a way that implies endorsement or affiliation"
            ]
          },
          "Nothing in these Terms transfers any intellectual-property rights to you.",
          {
            h3: "Client intellectual property"
          },
          "These Website Terms do not determine ownership of intellectual property created for a client.",
          "Ownership and licensing of software, designs, source code, content, branding, datasets or other project deliverables will be governed by the relevant client agreement.",
          "Third-party trademarks, logos and materials displayed on the Website remain the property of their respective owners."
        ]
      },
      {
        id: "portfolio-case-studies-and-testimonials",
        title: "Portfolio, Case Studies and Testimonials",
        body: [
          "The Website may contain examples of previous work, client logos, testimonials, case studies or descriptions of projects performed by Penaxis.",
          "Such material is provided to demonstrate our capabilities and experience.",
          "Project information may be simplified or presented at a high level to protect confidential or commercially sensitive information.",
          "Testimonials reflect the views or experiences of the individuals or organisations attributed to them and should not be interpreted as guarantees of identical results for other clients."
        ]
      },
      {
        id: "confidential-information-submitted-through-the-website",
        title: "Confidential Information Submitted Through the Website",
        body: [
          "Please do not submit passwords, credentials, highly sensitive information, proprietary source code or other confidential material through a general website form unless specifically requested by Penaxis.",
          "Submitting information through a general enquiry form does not, by itself, create a confidentiality or non-disclosure agreement.",
          "Where confidentiality obligations are required for a proposed project, they should be established through an appropriate written agreement or NDA.",
          "Information that is personal data will nevertheless be handled in accordance with our Privacy Policy and applicable law."
        ]
      },
      {
        id: "third-party-services-and-links",
        title: "Third-Party Services and Links",
        body: [
          "Our Website may contain links to or integrations with third-party websites, platforms, applications or services.",
          "These may include scheduling platforms, social networks, payment providers, analytics services, cloud platforms or other technology providers.",
          "Third-party services are controlled by their respective providers and may be subject to separate terms and privacy policies.",
          "Penaxis is not responsible for the availability, security, accuracy, content or practices of third-party websites or services that we do not control.",
          "The inclusion of a third-party link does not necessarily constitute an endorsement by Penaxis."
        ]
      },
      {
        id: "privacy",
        title: "Privacy",
        body: [
          {
            p: [
              "Your use of this Website is also subject to our ",
              {
                a: "Privacy Policy",
                href: "/privacy-policy"
              },
              ", which explains how we collect, use, disclose and protect personal information."
            ]
          },
          "Where appropriate, additional privacy or data-processing terms may apply to services Penaxis performs for clients."
        ]
      },
      {
        id: "electronic-communications",
        title: "Electronic Communications",
        body: [
          "When you contact us electronically, submit a form, approve a proposal electronically or otherwise communicate with us through electronic means, you consent to receiving relevant communications electronically.",
          "Where permitted by applicable law, electronic records, approvals, communications and signatures may be used in connection with our business relationships.",
          "This provision does not replace any specific signing or approval requirements contained in a separate agreement.",
          "Pakistan’s Electronic Transactions Ordinance establishes statutory recognition for electronic documents and communications."
        ]
      },
      {
        id: "website-availability-and-security",
        title: "Website Availability and Security",
        body: [
          "We aim to keep the Website available and functioning properly but cannot guarantee uninterrupted or error-free access.",
          "We may modify, suspend, restrict or discontinue all or part of the Website for maintenance, security, upgrades or other operational reasons.",
          "While we take reasonable security measures, no website, network or internet transmission can be guaranteed to be completely secure.",
          "You are responsible for taking appropriate precautions when using the internet and accessing third-party content."
        ]
      },
      {
        id: "disclaimer-of-warranties",
        title: "Disclaimer of Warranties",
        body: [
          "To the maximum extent permitted by applicable law, this Website and its content are provided on an “as is” and “as available” basis.",
          "Penaxis does not make any representation or warranty that:",
          {
            list: [
              "The Website will always be available or uninterrupted",
              "All Website content will always be complete, accurate or current",
              "The Website will be free from errors or security vulnerabilities",
              "Information on the Website will meet your particular business or technical requirements",
              "Using information from the Website will produce any particular commercial result"
            ]
          },
          "Nothing on the Website constitutes legal, financial, accounting, tax or other regulated professional advice.",
          "You should obtain appropriate professional advice where necessary."
        ]
      },
      {
        id: "limitation-of-liability",
        title: "Limitation of Liability",
        body: [
          "To the maximum extent permitted by applicable law, Penaxis and its directors, employees, contractors and representatives will not be liable for indirect, incidental, special, consequential or punitive losses arising solely from your use of, or inability to use, this Website.",
          "This may include loss of profits, revenue, business opportunities, goodwill or data where such loss results from reliance on Website content or use of the Website.",
          "Nothing in these Terms excludes or limits any liability that cannot lawfully be excluded or limited.",
          "Importantly, liability arising from services Penaxis performs for a client will be governed by the applicable client agreement rather than this Website provision."
        ]
      },
      {
        id: "indemnification",
        title: "Indemnification",
        body: [
          "To the extent permitted by applicable law, you agree to be responsible for losses, claims or expenses reasonably incurred by Penaxis as a direct result of your unlawful use of the Website, infringement of another person’s rights or material violation of these Terms.",
          "This section does not impose liability where the relevant loss was caused by Penaxis’s own unlawful conduct."
        ]
      },
      {
        id: "changes-to-the-website",
        title: "Changes to the Website",
        body: [
          "We may change, update, remove or discontinue Website content, features or services without prior notice.",
          "Descriptions of services, technologies and capabilities may therefore change as our business evolves.",
          "We are not obligated to continue offering any particular service solely because it was previously displayed on the Website."
        ]
      },
      {
        id: "changes-to-these-terms",
        title: "Changes to These Terms",
        body: [
          "We may update these Terms periodically to reflect changes in our Website, services, business practices or legal obligations.",
          "The date at the top of this page identifies the latest version.",
          "Changes become effective when the updated Terms are published unless otherwise stated.",
          "Your continued use of the Website after an update will constitute acceptance of the revised Terms to the extent permitted by applicable law."
        ]
      },
      {
        id: "governing-law-and-jurisdiction",
        title: "Governing Law and Jurisdiction",
        body: [
          "These Terms and any dispute arising specifically from your use of this Website will be governed by the laws of the Islamic Republic of Pakistan, without giving effect to principles that would require application of another jurisdiction’s laws.",
          "Subject to applicable law, disputes relating specifically to these Website Terms will be subject to the jurisdiction of the courts of competent jurisdiction in Lahore, Punjab, Pakistan.",
          "If you have entered into a separate agreement with Penaxis containing different governing-law, jurisdiction or dispute-resolution provisions, the terms of that agreement will apply to matters arising from that engagement."
        ]
      },
      {
        id: "severability",
        title: "Severability",
        body: [
          "If any provision of these Terms is determined by a court or competent authority to be invalid or unenforceable, the remaining provisions will continue in effect to the extent permitted by law.",
          "The invalid provision will be interpreted or modified only to the extent necessary to make it enforceable where legally possible."
        ]
      },
      {
        id: "no-waiver",
        title: "No Waiver",
        body: [
          "If Penaxis does not immediately enforce a provision of these Terms, that does not constitute a waiver of our right to enforce it later.",
          "A waiver of one provision or breach will not automatically constitute a waiver of another provision or subsequent breach."
        ]
      },
      {
        id: "entire-terms-for-website-use",
        title: "Entire Terms for Website Use",
        body: [
          "These Terms, together with our Privacy Policy and any other notices expressly incorporated into them, constitute the terms governing general use of this Website.",
          "They do not replace or amend any separate proposal, NDA, statement of work, service agreement, master services agreement, data-processing agreement or other contract entered into between Penaxis and a client.",
          "Where such an agreement conflicts with these Website Terms in relation to a client engagement, the separately agreed contract will prevail."
        ]
      },
      {
        id: "contact-us",
        title: "Contact Us",
        body: [
          "If you have questions regarding these Terms & Conditions, please contact:",
          {
            p: [
              "Penaxis (Private) Limited",
              {
                br: true
              },
              "Email: ",
              {
                a: "info@penaxis.com",
                href: "mailto:info@penaxis.com"
              },
              {
                br: true
              },
              "Website: penaxis.com"
            ]
          }
        ]
      }
    ]
  },
];

export const getPolicy = (slug: string) => POLICIES.find((p) => p.slug === slug);
