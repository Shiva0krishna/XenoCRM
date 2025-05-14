# Mini CRM Platform

A modern CRM platform that enables customer segmentation, personalized campaign delivery, and intelligent insights.

## Features

- 🔐 Google OAuth 2.0 Authentication
- 👥 Customer Segmentation with Flexible Rules
- 📧 Campaign Management
- 📊 Campaign Delivery Tracking
- 🤖 AI-Powered Features (Coming Soon)

## Tech Stack

- **Frontend**: Next.js 14 with React
- **Backend**: Next.js API Routes
- **Database**: MySQL (via Railway)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI

## Prerequisites

- Node.js 18+ and npm
- MySQL database (Railway account)
- Google OAuth 2.0 credentials

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Authentication
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key

# Database (MySQL on Railway)
MYSQL_HOST=your-mysql-host
MYSQL_DATABASE=your-database-name
MYSQL_USERNAME=your-username
MYSQL_PASSWORD=your-password
MYSQL_PORT=your-port
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd crm-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run db:setup
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── campaigns/         # Campaign management
│   └── segments/          # Customer segmentation
├── components/            # React components
├── types/                 # TypeScript type definitions
└── prisma/               # Database schema and migrations
```

## API Endpoints

### Authentication
- `GET /api/auth/signin` - Sign in with Google
- `GET /api/auth/signout` - Sign out

### Segments
- `GET /api/segments` - List all segments
- `POST /api/segments` - Create a new segment

### Campaigns
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create a new campaign

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
