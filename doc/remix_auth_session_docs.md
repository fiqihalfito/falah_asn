
# 📝 Dokumentasi Otentikasi dan Session di Remix

## 📑 Daftar Isi

1. [Konsep Dasar Session di Remix](#1-konsep-dasar-session-di-remix)  
2. [Pertukaran Cookie antara Client dan Server](#2-pertukaran-cookie-antara-client-dan-server)  
3. [Waktu Habisnya Cookie (Cookie Expiration)](#3-waktu-habisnya-cookie-cookie-expiration)  
4. [Keamanan: Bagaimana jika Client Membuat Cookie Sendiri?](#4-keamanan-bagaimana-jika-client-membuat-cookie-sendiri)  
5. [SESSION_SECRET: Apa Itu dan Bagaimana Mengaturnya?](#5-session_secret-apa-itu-dan-bagaimana-mengaturnya)  
6. [Google Strategy dan Fungsi Token](#6-google-strategy-dan-fungsi-token)  
7. [Apakah Token Disimpan atau Digunakan Sekali?](#7-apakah-token-disimpan-atau-digunakan-sekali)  
8. [Isi Cookie: Apa yang Disimpan di Client](#8-isi-cookie-apa-yang-disimpan-di-client)  
9. [Struktur dan Perilaku `saveSession()`](#9-struktur-dan-perilaku-savesession)  
10. [Menjaga Session Tetap Bersih (Optional)](#10-menjaga-session-tetap-bersih-optional)  

---

## 1. Konsep Dasar Session di Remix

Remix menggunakan `createCookieSessionStorage` untuk menyimpan session dalam bentuk cookie. Session tersebut dapat berisi berbagai key-value (misalnya user data), dan hanya akan terserialisasi sebagai satu cookie.

```ts
export const sessionStorage = createCookieSessionStorage<{ user: SessionUser }>({{
  cookie: {{
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
  }},
}})
```

## 2. Pertukaran Cookie antara Client dan Server

- **Server mengirim cookie** ke browser hanya sekali, saat login (melalui header `Set-Cookie`)
- **Browser akan mengirim cookie tersebut** ke server di setiap request berikutnya (melalui header `Cookie`)

```ts
// Server mengirim
Set-Cookie: __session=...; Path=/; HttpOnly

// Client akan mengirim ulang
Cookie: __session=...
```

## 3. Waktu Habisnya Cookie (Cookie Expiration)

- Cookie **hilang ketika tab atau browser ditutup** (default session cookie)
- Untuk persist login:
```ts
maxAge: 60 * 60 * 24 * 7, // 7 hari
```

## 4. Keamanan: Bagaimana jika Client Membuat Cookie Sendiri?

- Client boleh saja membuat cookie `__session` palsu, tapi tidak akan valid
- Karena Remix menandatangani cookie, maka cookie palsu akan dianggap rusak
- `getSession()` akan mengembalikan session kosong

## 5. SESSION_SECRET: Apa Itu dan Bagaimana Mengaturnya?

- Digunakan untuk mengenkripsi dan menandatangani cookie
- Pastikan cukup panjang dan acak, contoh:
```bash
openssl rand -base64 32
```

## 6. Google Strategy dan Fungsi Token

```ts
const googleStrategy = new GoogleStrategy({ ... }, async ({ tokens }) => {
  const profile = await GoogleStrategy.userProfile(tokens)
  ...
})
```

- `tokens` adalah akses token dari Google, digunakan untuk memanggil API seperti mengambil profil user.

## 7. Apakah Token Disimpan atau Digunakan Sekali?

- Token hanya digunakan **sekali** untuk mengambil profil user
- Tidak disimpan
- Setelah itu user info dimasukkan ke session dan disimpan via cookie

## 8. Isi Cookie: Apa yang Disimpan di Client

- Key: `__session`
- Value: serialisasi isi session seperti:
```ts
{ user: { id: 123, email: 'user@example.com', role: 'peserta' } }
```

## 9. Struktur dan Perilaku `saveSession()`

```ts
export const saveSession = async (request: Request, user: SessionUser) => {
  const session = await getSession(request)
  session.set('user', user)
  return new Headers({
    'Set-Cookie': await sessionStorage.commitSession(session),
  })
}
```

- `session.set()` mengganti atau menambah key
- Key lainnya tetap ada

## 10. Menjaga Session Tetap Bersih (Optional)

Gunakan session baru jika ingin mulai dari kosong:

```ts
const session = await sessionStorage.getSession(null)
session.set('user', user)
```

---

## ✅ Kesimpulan

- Cookie dikirim 1x oleh server dan digunakan client seterusnya
- Session aman karena ditandatangani dengan `SESSION_SECRET`
- Token Google tidak disimpan, hanya digunakan sekali
