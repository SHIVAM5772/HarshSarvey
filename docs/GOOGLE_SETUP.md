# Google login aur enquiry Sheet ka setup

Website ka code ready hai. Google Cloud credentials add karne ke baad login aur enquiry saving activate honge. Sirf **sc698027@gmail.com** ka verified Google account admin ban sakta hai. Client ko login nahi karna hai.

## 1. Google Cloud project banayein

1. [Google Cloud Console](https://console.cloud.google.com/) par apne Google account se login karein.
2. Project selector → **New project**. Naam: `Harsh Survey Website`.
3. **APIs & Services → Library** mein **Google Sheets API** enable karein.

## 2. Google login configure karein

1. **Google Auth platform → Branding** mein app name `Harsh Survey Consultancy` aur support email set karein.
2. Gmail account ke liye **Audience → External** choose karein. Testing mode mein **Test users** mein `sc698027@gmail.com` add karein.
3. Data Access mein sirf basic identity scopes `openid`, `email`, `profile` chahiye. Admin login ko Google Drive ya Sheet access ki permission nahi chahiye.
4. **Clients → Create Client → Web application** choose karein.
5. Authorized JavaScript origin: `http://localhost:3000`.
6. Authorized redirect URI exactly: `http://localhost:3000/api/auth/callback/google`.
7. Client ID aur Client Secret ko `.env.local` ke `GOOGLE_CLIENT_ID` aur `GOOGLE_CLIENT_SECRET` mein paste karein. Secrets chat mein ya source code mein paste na karein.

## 3. Enquiry ke liye private Sheet banayein

1. [Google Sheets](https://sheets.google.com/) mein blank spreadsheet banayein, naam `Harsh Survey Enquiries`.
2. Neeche tab ko **Inquiries** rename karein.
3. Cell **A1** select karke neeche wali tab-separated line paste karein. Ye A1 se K1 tak 11 columns banayegi:

```text
ID	Created At	Name	Phone	Email	Organization	Service	Location	Message	Status	Source
```

4. URL `https://docs.google.com/spreadsheets/d/SHEET_ID/edit` mein se `SHEET_ID` copy karein; `.env.local` mein `GOOGLE_SHEET_ID` set karein.
5. **General access Restricted hi rakhein**. Sheet ko publish ya anyone-with-link karne ki zarurat nahi hai.

Header names, ID column aur column order ko change na karein. Sheet ko directly sort karne ke liye filter views use karein; status updates ke dauran rows move/delete na karein. Dashboard har update se pehle ID se row lookup karta hai, lekin Google Sheets transactional database nahi hai.

## 4. Website ko Sheet access dein

1. Usi Cloud project mein **IAM & Admin → Service Accounts → Create service account** kholein.
2. Naam `harsh-survey-enquiries` rakhein. Project-wide roles aur domain-wide delegation ki zarurat nahi hai.
3. Service account → **Keys → Add key → Create new key → JSON**. Downloaded JSON ko private rakhein; `public/` folder ya Git mein na daalein.
4. JSON ka `client_email` → `.env.local` mein `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
5. JSON ka `private_key` → `.env.local` mein `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, double quotes aur `\n` ke saath ek line par.
6. Google Sheet ke **Share** dialog mein service account ki `client_email` add karein, role **Editor**. Ye website ki identity hai; admin login ke liye aapki Gmail identity alag hai.

## 5. Local configuration

Project root `D:\HarshSarvey` mein `.env.local` file already create ho sakti hai. Agar file nahi hai to `.env.example` ki copy `.env.local` banayein. Existing values preserve karein.

```dotenv
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_SHEET_TAB=Inquiries
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
TRUST_PROXY_HEADERS=false
```

`NEXTAUTH_SECRET` ke liye terminal mein run karein, agar local file mein pehle se generated value nahi hai:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Env save karne ke baad development server restart karein:

```powershell
npm run dev
```

## 6. Check karein

1. `/admin` ya footer ka **Admin Login** kholein. `sc698027@gmail.com` se Google sign-in karein.
2. Dusre account se login par access deny hona chahiye. Enquiry API bhi server par login check karti hai.
3. Website ka Quote ya Contact form submit karein. Success tabhi aayegi jab Google Sheet write complete ho.
4. Sheet mein nayi row dekhein. Admin Dashboard par **Refresh** karein; enquiry dikhni chahiye.
5. Status `New → Contacted → Completed` karke Sheet ke J column mein change check karein.
6. Logout karke `/api/admin/inquiries` kholein: **401 Admin login required** aana chahiye.

Google configuration ke bina forms **503** error dikhayenge, fake success nahi. Phone/WhatsApp ka direct option use ho sakta hai. WhatsApp-only buttons messages open karte hain; message ko Sheet mein saved enquiry nahi maana jata.

## 7. Live website par deploy karte waqt

- Node.js/server-capable hosting use karein; static export par auth/API routes nahi chalenge.
- Hosting ke private environment settings mein wahi secrets add karein. `.env.local` commit na karein.
- `NEXTAUTH_URL=https://your-domain.com` set karein aur Google OAuth client mein `https://your-domain.com/api/auth/callback/google` redirect URI add karein.
- Google testing mode mein authorized test user login kar sakta hai; production par Google ki consent-screen requirements follow karein.
- Public enquiry endpoint par basic per-process limit 10 requests/minute hai. `TRUST_PROXY_HEADERS=false` par ye local server ke liye shared limit hai. Trusted hosting jo forwarded headers overwrite karti ho, wahi `true` set karein. Multiple instances ke production deployment mein edge/shared rate limiting lagayein.
- Dashboard manual **Refresh** se data reload karta hai. Google Sheets quota ke liye unnecessary polling avoid ki gayi hai.
- Sheet append requests automatically retry nahi hote. Network timeout ke baad dubara form submit karne se pehle Sheet check karein; pehla write complete hua ho sakta hai.

## Official references

- [Google credentials setup](https://developers.google.com/workspace/guides/create-credentials)
- [Google Sheets API setup](https://developers.google.com/workspace/sheets/api/quickstart/nodejs)
- [NextAuth Google provider and callback URL](https://next-auth.js.org/providers/google)
- [Writing rows to Google Sheets](https://developers.google.com/workspace/sheets/api/guides/values)
