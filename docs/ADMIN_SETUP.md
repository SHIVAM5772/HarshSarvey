# Admin username/password login

1. Atlas mein **Connect → Drivers** se connection URI copy karein. Database user/password URI mein set karein aur app server ka IP Atlas Network Access mein allow karein.
2. `.env.local` mein `MONGODB_URI` set karein aur `MONGODB_DB=Harsh` rakhein. `NEXTAUTH_URL` aur random `NEXTAUTH_SECRET` bhi required hain (`.env.example` dekhein).
3. `npm run admin:create` chalayein (Node.js 22.18+). Default username `RamKumar` hai. Command strong password generate karke ek baar terminal mein dikhayegi; securely save karein. Apna password chahiye to command se pehle local `ADMIN_PASSWORD` environment variable set karein (12–256 characters), phir unset karein.
4. App restart karein, `/admin` kholein aur username/password se login karein.

Database: `Harsh`; collection: `user`.
Fields: `_id`, `username`, `usernameNormalized`, `passwordHash`, optional `email`, `sessionVersion`, `role: "admin"`, `isActive: true`, `createdAt`, `updatedAt`.
Passwords scrypt hash ke roop mein store hote hain. Plain `password` field add karne se login nahi hoga. Existing account ka password/role setup command overwrite nahi karti.

Username case-insensitive hai. Har username ke liye 15-minute window mein 10 login attempts allowed hain. `adminLoginAttempts` collection ka TTL index expired counters clean karta hai. Sessions expire after eight hours; inactive/deleted/non-admin users lose access on the next session check.

## Google login and profile

Google Cloud mein Web OAuth client banayein. Authorized redirect URI `http://localhost:3000/api/auth/callback/google` rakhein (production mein apna domain). `.env.local` mein `GOOGLE_CLIENT_ID` aur `GOOGLE_CLIENT_SECRET` set karke restart karein. Username/password login Google credentials ke bina bhi available hai.

Google sign-in sirf verified email ko allow karta hai jo active admin ke `email` field mein registered ho. Arbitrary Gmail accounts automatically admins nahi bante. Existing admin ke email ko database mein lowercase format mein set karein; har email ek admin ke liye unique hai.

Login ke baad profile icon kholein. **Change password** mein current password, new password aur confirmation enter karein. Change successful hone par sabhi existing sessions revoke honge aur dobara sign in karna hoga.

**New admin user** mein username, password aur optional Google email bharein. Naya admin username/password se login kar sakta hai; registered email se Google login bhi available hai. Ye form sirf logged-in admins ko available hai.

## Full profile and email OTP

Profile menu ka **View profile** `/admin/profile` kholta hai. Name, phone, email, date of birth, gender aur address personal-information table mein dikhte hain. **Edit personal details** se apne details update karein. Existing users ke missing fields ko `Not provided` dikhaya jata hai.

**Create new admin** isi page par available hai. Email blank rakhne par username/password account banta hai. Email enter karne par **Send verification code** se naye admin ke inbox mein OTP jata hai; sahi OTP ke bina account create nahi hoga. Verified Google email se Google login bhi available hai.

**Edit account email** mein new email par OTP bhejein, OTP aur current password enter karke save karein. Purana email tab tak unchanged rehta hai jab tak verification complete na ho. Success ke baad sabhi purane sessions invalidate hote hain aur dobara login karna hota hai.

SMTP values `.env.local` mein set karein aur server restart karein:

```dotenv
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-login
SMTP_PASSWORD=your-smtp-password
MAIL_FROM="Harsh Survey <your-verified-sender@example.com>"
```

`SMTP_FROM` bhi `MAIL_FROM` ki jagah supported hai. Brevo mein sender address verified hona chahiye. STARTTLS required hai; port 465 par `SMTP_SECURE=true` use karein. SMTP failure par fake success ya unverified email account create nahi hota.

OTP 10 minutes mein expire hota hai, maximum 5 guesses allowed hain, aur successful verification ke baad reuse nahi ho sakta. Codes actor, email aur action se bound hain. Resend cooldown 60 seconds hai; hourly limits 10 requests per admin aur 5 per address hain. Database mein sirf keyed OTP hashes store hote hain; codes API response ya logs mein nahi aate.

`npm run build` ke baad `npm run test:integration` se complete profile/OTP integration checks run karein. Runner temporary admin fixture aur local server create karta hai; cleanup mein test accounts/challenges remove hote hain. Email delivery tests mein mock hoti hai; woh kisi real inbox ko email nahi bhejte. Existing admin credentials badalne ki zarurat nahi hai.

Enquiries Google Sheets mein save hoti hain. Unke liye [Google Sheets setup](GOOGLE_SETUP.md) follow karein.
