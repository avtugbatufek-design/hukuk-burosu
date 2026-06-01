# [Büro Adı] Hukuk & Danışmanlık — Statik Web Sitesi

Büyük ölçekli şirketlere ve yabancı müvekkillere yönelik, **iki dilli (TR/EN)**, modern ve statik bir hukuk bürosu web sitesi. Derleme adımı yoktur — saf HTML/CSS/JS.

## Çalıştırma

En kolay yol, dosyayı doğrudan tarayıcıda açmak:

```
index.html  ->  çift tıkla
```

Harita iframe'i ve fontların sorunsuz yüklenmesi için yerel bir sunucu önerilir:

```bash
cd websitem
python3 -m http.server 8000
# tarayıcıda: http://localhost:8000
```

## Dosya Yapısı

```
websitem/
├── index.html            # Tek sayfa: hero, sayaçlar, çalışma alanları, hakkımızda,
│                         #            ekip, yayınlar, SSS, iletişim
├── blog.html             # Yayın listesi sayfası
├── assets/
│   ├── css/styles.css    # Tüm stiller (tema :root değişkenlerinde)
│   ├── js/i18n.js        # TR/EN çeviriler + dil değiştirme
│   ├── js/main.js        # Menü, sayaç animasyonu, SSS, form
│   └── img/favicon.svg
└── README.md
```

## Özelleştirme (yer tutucular)

Aşağıdaki yerleri kendi bilgilerinizle değiştirin:

| Ne | Nerede |
|----|--------|
| **Büro adı** `[Büro Adı]` | `index.html`, `blog.html`, `<title>` ve `.brand__name` |
| **Metinler (TR/EN)** | `assets/js/i18n.js` içindeki `translations` sözlüğü |
| **Sayaç değerleri** | `index.html` → `data-target="..."` (müvekkil/dava/yıl/ülke) |
| **Ekip üyeleri** | `index.html` → `.team` bölümü (isim + `member__photo` baş harfleri) |
| **Telefon / e-posta / adres** | `index.html` iletişim bölümü ve footer |
| **Harita** | `index.html` → `.map iframe` `src`'sini büro adresinizle değiştirin |
| **Logo / favicon** | `assets/img/favicon.svg` ve `.brand__mark` SVG'leri |
| **Renkler** | `assets/css/styles.css` → `:root` (`--c-copper`, `--c-surface` vb.) |

## İletişim Formunu Aktifleştirme

Form, kod değişikliği gerektirmeyen **[Formspree](https://formspree.io)** ile çalışır:

1. Formspree'de ücretsiz hesap açıp bir form oluşturun, `form ID`'nizi alın.
2. `index.html` içindeki form `action`'ını güncelleyin:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```
   `YOUR_FORM_ID` yerine kendi ID'nizi yazın.

> Not: `action` ayarlanmadığı sürece form **demo modunda** çalışır — gönderimde başarı mesajı gösterir ama veriyi bir yere iletmez. Alternatif olarak basit bir `mailto:` linki de kullanılabilir.

## Diller

Dil değiştirme tamamen istemci taraflıdır; tercih `localStorage`'da saklanır ve sayfa yenilense de korunur. Yeni metin eklerken HTML'de `data-i18n="anahtar"` kullanın ve `i18n.js` içinde hem `tr` hem `en` için aynı anahtarı tanımlayın.

## Yayınlama

Statik olduğu için herhangi bir statik barındırmaya yüklenebilir: **Netlify, Vercel, GitHub Pages, Cloudflare Pages** vb. Klasörü olduğu gibi yüklemeniz yeterlidir.

---

> Bu site bilgilendirme amaçlıdır; içerikler örnektir ve hukuki tavsiye niteliği taşımaz.
