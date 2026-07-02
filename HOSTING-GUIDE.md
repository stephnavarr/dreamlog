# Hosting Guide: bystephanienavarro.com

A complete walkthrough from your computer to a live website.

---

## What you'll need (all free or one-time costs)
- Hugo installed ✓
- VS Code installed ✓
- A GitHub account (free) → github.com
- A Netlify account (free) → netlify.com
- Your domain: **bystephanienavarro.com** (buy from Namecheap or Google Domains, ~$12/year)

---

## Step 1 — Set up the project in VS Code

1. Open VS Code
2. Open the **blog** folder you received (File → Open Folder)
3. Open the terminal inside VS Code (Terminal → New Terminal)

Test Hugo is working:
```
hugo server
```
Visit `http://localhost:1313` — you should see your site live locally.

---

## Step 2 — Push to GitHub

1. Create a free account at **github.com**
2. Click the **+** → New repository
3. Name it: `stephanie-blog` (or anything you like)
4. Keep it **Private**, click Create

Back in VS Code terminal:
```bash
git init
git add .
git commit -m "Initial blog setup"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/stephanie-blog.git
git push -u origin main
```
(Replace `YOUR-USERNAME` with your GitHub username.)

---

## Step 3 — Deploy on Netlify (free hosting)

1. Go to **netlify.com** and sign up with your GitHub account
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** → authorize → select `stephanie-blog`
4. Configure the build:
   - **Build command:** `hugo`
   - **Publish directory:** `public`
5. Click **Deploy site**

Netlify will build and give you a URL like `random-name.netlify.app`.
Your site is live! Now let's attach your real domain.

---

## Step 4 — Connect your domain

### Buy the domain
Go to **namecheap.com** (recommended) or domains.google.com and purchase:
`bystephanienavarro.com`

### Point domain to Netlify
**In Netlify:**
1. Go to Site Settings → Domain Management
2. Click **Add custom domain**
3. Type `bystephanienavarro.com` → Verify → Add domain

Netlify will show you **nameserver addresses** that look like:
```
dns1.p00.nsone.net
dns2.p00.nsone.net
dns3.p00.nsone.net
dns4.p00.nsone.net
```

**In Namecheap:**
1. Log in → Domain List → click **Manage** next to your domain
2. Go to **Nameservers**
3. Switch dropdown from "Namecheap BasicDNS" to **Custom DNS**
4. Paste in Netlify's nameservers (all four)
5. Save

DNS changes take 15 minutes to 48 hours to fully propagate.

### Enable HTTPS (free, automatic)
Back in Netlify → Domain Management → scroll to HTTPS → click **Verify DNS configuration** → **Provision certificate**. Done — your site will be `https://bystephanienavarro.com`.

---

## Step 5 — Writing new posts

### Dream Space poem
Create a new file in `content/dreamspace/` named `your-poem-title.md`:

```markdown
---
title: "your poem title"
date: 2024-04-01
excerpt: "a line that pulls readers in"
---

Your poem
goes here
line by line
```

### Home essay
Create a file in `content/home-essays/your-essay-title.md`:

```markdown
---
title: "Your Essay Title"
date: 2024-04-01
excerpt: "One sentence that captures the feeling."
---

Your prose goes here...
```

### 21st Century Woman essay
Create a file in `content/woman/your-essay-title.md`:

```markdown
---
title: "Your Essay Title"
date: 2024-04-01
excerpt: "The argument in one line."
tags: ["feminism"]
---

Your essay here...
```

---

## Step 6 — Publish updates

Every time you write something new, in your VS Code terminal:
```bash
git add .
git commit -m "new post: title of your essay"
git push
```

Netlify detects the push and rebuilds your site automatically — usually live within 60 seconds.

---

## Folder structure reference

```
blog/
├── hugo.toml              ← site config (baseURL, menus)
├── content/
│   ├── dreamspace/        ← your poems go here
│   ├── home-essays/       ← family/memory essays
│   └── woman/             ← feminist/political essays
├── layouts/
│   ├── index.html         ← the homepage
│   ├── dreamspace/        ← dream space templates
│   ├── home-essays/       ← home essay templates
│   └── woman/             ← woman essay templates
└── static/
    ├── css/               ← all styling
    └── js/                ← glitter animations
```

---

## Tips

- **Preview before publishing:** always run `hugo server` to see your post locally before pushing
- **Drafts:** add `draft: true` in frontmatter to hide a post without deleting it
- **Images:** put images in `static/images/` and reference them as `/images/photo.jpg`
- **Markdown basics:** `**bold**`, `*italic*`, `# Heading`, `> blockquote`
