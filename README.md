# Cribb 🏠

**Discover your next home through immersive short-form video tours.**

Cribb is a modern real estate platform that revolutionizes the way you find apartments. Instead of static images, Cribb brings listings to life with a TikTok-style vertical video feed, making apartment hunting as engaging and effortless as scrolling through your favorite social media.

![Cribb Banner](https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3)

## ✨ Key Features

- **🎬 Immersive Video Feed**: Swipe through high-quality video walkthroughs of premium apartment listings.
- **⚡ Fast Search & Filters**: Quickly narrow down your search by city, price range, and property type (Studio, 1BR, 2BR+).
- **🤝 Direct Broker Connection**: Instantly reach out to verified brokers via integrated contact forms.
- **❤️ Social Interaction**: Like, save, and share listings with friends or roommates.
- **📱 Mobile-First Experience**: Optimized for touch controls with smooth transitions and gestures.
- **🔒 Secure Backend**: Powered by Firebase for real-time data and secure interactions.

## 🚀 Tech Stack

- **Frontend**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/apartment-reels-main.git
   cd apartment-reels-main
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configurations:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Build for production**
   ```bash
   pnpm build
   ```

## 📂 Project Structure

```text
src/
├── assets/         # Images, logos, and static files
├── components/     # Reusable UI components (shadcn/custom)
├── data/           # Types and mock data
├── hooks/          # Custom React hooks
├── lib/            # External library configurations (Firebase, etc.)
├── pages/          # Full page layouts
├── services/       # Firebase and API service layers
└── App.tsx         # Main application entry and routing
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by the Cribb Team.