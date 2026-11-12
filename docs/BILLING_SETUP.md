# Bills and quotations

Sign in and open **Create bill** or **Create quotation** in Admin workspace (`/admin/documents`). Both forms support client name, address, phone, email, optional company/client GSTIN, project, up to 50 line items, quantity, unit, rate, HSN/SAC, discount, tax percentage, notes, payment details and terms. Bills also track amount received and balance due.

**Save & download PDF** saves an immutable document and downloads the actual PDF file. **Save** retains it without downloading. The latest 50 documents appear in history, where PDFs can be downloaded again. Changing document type retains unsaved details. Use **Create another** after saving for a fresh form.

Numbers are assigned automatically as `BILL-YYYY-00001` and `QUO-YYYY-00001`, with independent atomic counters per kind/year. Database collections are `billingDocuments` and `documentCounters` in the configured MongoDB database. Retrying the same save request does not create a duplicate document. Counter gaps can occur after failed/concurrent requests; existing numbers are never reused.

Totals are calculated on the server in paise. Line amounts are rounded to the nearest paise; a fixed discount is applied before the user-entered tax percentage. The tax defaults to zero. PDF amounts are in INR. Users supply their own tax rate and GSTIN; the app does not infer tax treatment or split GST into components. The document is labelled **Bill** or **Quotation**.

Company name, address and contact information are snapshotted when a document is saved. Optional company GSTIN, bank details, notes and terms are supplied in the form. No bank account or registration number is invented. The PDF includes the company logo, embedded Noto fonts, repeated table headers, page numbers and multi-page layouts. All document routes and PDF downloads require an active admin session. PDF responses are private and are not cached.

PDF generation requires a Node.js server. Include `public/fonts/` and `public/images/logo.png` when deploying, along with other public assets. The Noto font license is in `public/fonts/OFL-Noto.txt`.

Run `npm test` for amount, validation and PDF generation tests. Run `npm run build` followed by `npm run test:integration` for authenticated creation, replay/retry and repeated download checks. Integration tests use a newly created `Harsh_test_<random-id>` database and remove it afterward, leaving the configured production database and number counters untouched.
