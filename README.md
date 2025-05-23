# Daily GitHub Contribution Project

This project consists of a professional-looking HTML dashboard and a Cloudflare Worker that automatically updates a JSON data file daily to create GitHub contributions.

## Project Structure

```
.
├── html-dashboard/         # The main HTML project
│   ├── index.html          # Main dashboard page
│   ├── data.json           # JSON data file (updated daily)
│   └── assets/
│       ├── css/            # CSS stylesheets
│       ├── js/             # JavaScript files
│       └── images/         # Image assets
└── worker/                 # Cloudflare Worker files
    └── index.js            # Worker script to update data.json
```

## Features

- **Professional Dashboard**: A modern, responsive dashboard UI that displays data from a JSON file
- **Daily Updates**: Cloudflare Worker automatically updates the JSON data daily
- **GitHub Contributions**: Each update creates a commit, ensuring daily GitHub contribution activity

## How It Works

1. The HTML dashboard displays data from `data.json`
2. The Cloudflare Worker runs on a daily schedule (using Cron Triggers)
3. The Worker:
   - Fetches the current data.json
   - Generates new random values
   - Updates the JSON file with a commit to GitHub
   - This creates a daily contribution in your GitHub activity graph

## Setup Instructions

### Dashboard Setup

1. Host the `html-dashboard` directory on your preferred hosting service (GitHub Pages, Netlify, etc.)
2. The dashboard will automatically load data from `data.json`

### Cloudflare Worker Setup

1. Create a Cloudflare account if you don't have one
2. Install Wrangler CLI: `npm install -g wrangler`
3. Authenticate with Cloudflare: `wrangler login`
4. Navigate to the `worker` directory
5. Deploy the worker: `wrangler deploy`
6. Set up environment variables:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token
   - `GITHUB_REPO`: Your repository name (e.g., `username/repo`)
7. Set up a Cron Trigger to run daily (e.g., `0 0 * * *` for midnight UTC)

## Customization

- Modify `data.json` to change the initial data structure
- Edit the HTML/CSS to customize the dashboard appearance
- Adjust the Worker script to change how data is updated

## License

MIT 