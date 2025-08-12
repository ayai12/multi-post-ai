colour theme | Role                   | Hex                             | Usage                            |
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
{
  "projectName": "AI Content Repurposer",
  "description": "One-page SaaS where users paste or upload content and instantly get repurposed outputs (tweet threads, Instagram captions, LinkedIn posts, summaries). UI only, no backend logic.",
  "layout": {
    "navbar": {
      "position": "top-fixed",
      "background": "#ffffff",
      "shadow": true,
      "left": { "type": "logo", "text": "AI Content Repurposer" },
      "right": [
        { "type": "link", "text": "Pricing" },
        { "type": "link", "text": "Login" },
        { "type": "button", "style": "primary", "text": "Sign Up" }
      ]
    },
    "sections": [
      {
        "id": "hero",
        "background": "#ffffff",
        "layout": "two-column",
        "left": {
          "heading": { "text": "Turn One Piece of Content Into 10x More", "tag": "h1" },
          "subheading": "Paste your content and instantly get ready-to-use social posts, summaries, and more.",
          "cta": { "type": "button", "style": "primary", "text": "Get Started Free" }
        },
        "right": { "type": "image", "src": "https://via.placeholder.com/500x300" }
      },
      {
        "id": "toolUI",
        "background": "#f8f9fa",
        "containerStyle": "card",
        "steps": [
          {
            "title": "Step 1 — Content Input",
            "elements": [
              { "type": "textarea", "placeholder": "Paste your blog post, transcript, or any long-form content here…" },
              { "type": "button", "style": "secondary", "text": "Upload File" }
            ]
          },
          {
            "title": "Step 2 — Select Output Formats",
            "elements": [
              { "type": "checkbox", "label": "Tweet Thread" },
              { "type": "checkbox", "label": "Instagram Caption" },
              { "type": "checkbox", "label": "LinkedIn Post" },
              { "type": "checkbox", "label": "Summary" },
              { "type": "checkbox", "label": "Quote Cards" }
            ]
          },
          {
            "title": "Step 3 — Tone & Length Controls",
            "elements": [
              { "type": "dropdown", "label": "Tone", "options": ["Professional", "Casual", "Witty"] },
              { "type": "slider", "label": "Output Length", "min": 1, "max": 5 }
            ]
          },
          { "type": "button", "style": "primary", "text": "Repurpose My Content" }
        ],
        "outputArea": {
          "type": "scrollable-cards",
          "placeholderCards": [
            { "title": "Tweet Thread", "body": "Lorem ipsum dolor sit amet…", "buttons": ["Copy", "Download .txt"] },
            { "title": "Summary", "body": "Lorem ipsum dolor sit amet…", "buttons": ["Copy", "Download .txt"] }
          ]
        }
      },
      {
        "id": "pricing",
        "background": "#ffffff",
        "heading": "Pricing Plans",
        "columns": [
          { "title": "Free", "price": "€0", "features": ["3 repurposes/week"], "button": "Select Plan" },
          { "title": "Starter", "price": "€5/mo", "features": ["30 repurposes/month"], "button": "Select Plan" },
          { "title": "Pro", "price": "€15/mo", "features": ["150 repurposes/month", "Extra formats"], "button": "Select Plan" }
        ]
      },
      {
        "id": "testimonials",
        "background": "#f8f9fa",
        "heading": "What Our Users Say",
        "cards": [
          { "avatar": "https://via.placeholder.com/80", "name": "Jane Doe", "role": "Content Creator", "text": "This tool saved me hours every week." },
          { "avatar": "https://via.placeholder.com/80", "name": "Mark Smith", "role": "Blogger", "text": "Turning my blogs into tweets is now effortless." },
          { "avatar": "https://via.placeholder.com/80", "name": "Aisha Khan", "role": "Podcaster", "text": "Perfect for repurposing transcripts into posts." }
        ]
      }
    ],
    "footer": {
      "background": "#ffffff",
      "columns": [
        { "type": "logo", "text": "AI Content Repurposer — Save hours. Create more." },
        { "type": "links", "items": ["About", "Privacy", "Terms", "Contact"] },
        { "type": "social-icons", "icons": ["Twitter", "LinkedIn"] }
      ]
    }
  },
  "styles": {
    "colors": {
      "primary": "#0066cc",
      "primaryHover": "#004c99",
      "secondary": "#00d084",
      "background": "#ffffff",
      "sectionBackground": "#f8f9fa",
      "textPrimary": "#2e2e2e",
      "textSecondary": "#6c757d",
      "border": "#e0e0e0"
    },
    "typography": {
      "fontFamily": "Inter, sans-serif",
      "headings": { "fontWeight": "bold" },
      "buttons": { "fontWeight": "600", "textTransform": "uppercase" }
    },
    "components": {
      "buttons": { "borderRadius": "8px" },
      "cards": { "borderRadius": "8px", "shadow": "subtle" },
      "inputs": { "borderRadius": "8px", "border": "1px solid #e0e0e0" }
    }
  },
  "interactions": {
    "navbarLinks": "smooth-scroll",
    "buttonHover": "color-darken",
    "cardsHover": "shadow-increase",
    "sectionAnimations": "fade-in"
  }