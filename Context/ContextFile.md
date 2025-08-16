# AI Content Repurposer Context File

## Project Info
**Project Name:** AI Content Repurposer  
**Description:** One-page SaaS where users paste or upload content and instantly get repurposed outputs (tweet threads, Instagram captions, LinkedIn posts, summaries). UI only, no backend logic.

---

## Color Theme

| Role                   | Hex                             | Usage                            |
| ---------------------- | ------------------------------- | -------------------------------- |
| **Primary**            | `#FF6B35` (Vivid Sunset Orange) | Main buttons, key accents        |
| **Primary Hover**      | `#E85A2A`                       | Hover states for primary buttons |
| **Secondary**          | `#6A4C93` (Deep Violet)         | Highlights, secondary buttons    |
| **Secondary Hover**    | `#593D7A`                       | Secondary button hover           |
| **Background**         | `#FDF7F2` (Warm Cream)          | Main background                  |
| **Section Background** | `#FFF1E6` (Soft Peach)          | Alternating section backgrounds  |
| **Text Primary**       | `#2E2E2E` (Almost Black)        | Headlines, important text        |
| **Text Secondary**     | `#5A5A5A`                       | Body and subtext                 |
| **Border**             | `#E5DED7`                       | Card and input borders           |
| **Success Accent**     | `#00A676` (Fresh Green)         | Positive actions, success states |
| **Warning Accent**     | `#FFD23F` (Golden Yellow)       | Warnings, highlights             |

---

## Layout

### Navbar
- **Position:** top-fixed  
- **Background:** `#ffffff`  
- **Shadow:** true  
- **Left:** Logo text: `"AI Content Repurposer"`  
- **Right Links:** Pricing, Login, Sign Up (primary button)

---

### Sections

#### Hero
- **Background:** `#ffffff`
- **Layout:** two-column
- **Left Column:**  
  - Heading: `"Turn One Piece of Content Into 10x More"` (h1)  
  - Subheading: `"Paste your content and instantly get ready-to-use social posts, summaries, and more."`  
  - CTA Button: `"Get Started Free"` (primary)
- **Right Column:** Image placeholder `https://via.placeholder.com/500x300`

#### Tool UI
- **Background:** `#f8f9fa`  
- **Container Style:** card  
- **Steps:**  
  1. **Content Input**  
     - Textarea placeholder  
     - Upload File button (secondary)  
  2. **Select Output Formats**  
     - Tweet Thread  
     - Instagram Caption  
     - LinkedIn Post  
     - Summary  
     - Quote Cards  
  3. **Tone & Length Controls**  
     - Dropdown: Tone (Professional, Casual, Witty)  
     - Slider: Output Length (1–5)  
  4. **Repurpose My Content** button (primary)  

- **Output Area:** Scrollable cards with placeholders (Tweet Thread, Summary)

#### Pricing
- **Background:** `#ffffff`
- **Heading:** Pricing Plans  

---

## Subscription Plans & Features

### Free Plan
- Price: $0 (Always free)
- Features:
  1. 5 repurposes per month  
     - Key: `monthly_repurposes_limit_5`  
     - Description: User can repurpose up to 5 times per month.
  2. Only access to one format per request  
     - Key: `only_access_to_one_format_per_request`  
     - Description: User can select only one format per repurpose request.
  3. Limited access to formats  
     - Key: `limited_access_to_formats`  
     - Description: Access limited to core formats only. Supported formats: Tweets + Instagram Captions.
  4. Basic editing (trim + shorten)  
     - Key: `basic_editing`  
     - Description: Basic edit tools available.
  5. Email support only  
     - Key: `email_support_only`  
     - Description: Support via email.

---

### Pro Plan
- Price: $5 / Month
- Features:
  1. Unlimited repurposes/month  
     - Key: `unlimited_repurposes_month`  
     - Description: No monthly cap on repurposes.
  2. Access to all formats per request  
     - Key: `access_to_all_formats_per_request`  
     - Description: User can select all formats within a single repurpose request.
  3. Access to all formats  
     - Key: `access_to_all_formats`  
     - Description: Full access to all available formats.
  4. Basic editing (trim + shorten)  
     - Key: `basic_editing`  
     - Description: Basic edit tools available.
  5. Email support only  
     - Key: `email_support_only`  
     - Description: Support via email.

---

### Business Plan
- Price: $15 / Month
- Features:
  1. Unlimited repurposes/month  
     - Key: `unlimited_repurposes_month`  
     - Description: No monthly cap on repurposes.
  2. Access to all formats per request  
     - Key: `access_to_all_formats_per_request`  
     - Description: User can select all formats within a single repurpose request.
  3. Access to all formats  
     - Key: `access_to_all_formats`  
     - Description: Full access to all available formats.
  4. Basic editing (trim + shorten)  
     - Key: `basic_editing`  
     - Description: Basic edit tools available.
  5. Email support only  
     - Key: `email_support_only`  
     - Description: Support via email.
  6. Early access to new formats/features  
     - Key: `early_access`  
     - Description: Early access to new features and formats.

---

## Input & Upload Limits

- **Free**
  - Input size: up to 2,000 words per request
  - Upload size: up to 1 MB per file (.txt, .md)
  - Formats: 1 format per request
  - Quota: 5 repurposes/month (local enforcement)

- **Pro / Business**
  - Input size: up to 10,000 words per request
  - Upload size: up to 5 MB per file (.txt, .md)
  - Formats: multiple formats per request (all formats unlocked)
  - Quota: Unlimited

Notes:
- These limits are currently enforced client-side for UX. For production-grade anti-bypass, enforce on the server (e.g., Convex + Clerk).

## Format Categories

### Free Formats
- **Single Tweet** - One standalone tweet (280 characters max)
- **Tweet Thread** - Multi-tweet thread format
- **Summary** - Bullet point summary of content
- **LinkedIn Post** - Professional LinkedIn format


### Premium Formats  
- **Twitter Viral Thread** - Optimized viral thread with hooks and engagement tactics
- **Twitter Quote Cards** - Tweet-sized quotes with visual formatting suggestions
- **LinkedIn Carousel Post** - Multi-slide LinkedIn carousel with professional insights
- **Email Newsletter** - Full newsletter format with subject line and sections

### Testimonials
- **Background:** `#f8f9fa`
- Cards:
  - Jane Doe — Content Creator: `"This tool saved me hours every week."`
  - Mark Smith — Blogger: `"Turning my blogs into tweets is now effortless."`
  - Aisha Khan — Podcaster: `"Perfect for repurposing transcripts into posts."`

---

### Footer
- **Background:** `#ffffff`
- Columns:
  1. Logo & tagline: `"AI Content Repurposer — Save hours. Create more."`
  2. Links: About, Privacy, Terms, Contact
  3. Social Icons: Twitter, LinkedIn

---

## Styles

### Colors
```json
{
  "primary": "#0066cc",
  "primaryHover": "#004c99",
  "secondary": "#00d084",
  "background": "#ffffff",
  "sectionBackground": "#f8f9fa",
  "textPrimary": "#2e2e2e",
  "textSecondary": "#6c757d",
  "border": "#e0e0e0"
}
