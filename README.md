# Government Digital Services - Queue Management System

A modern, responsive, and animated frontend for government office ticketing and queue management. Built with React, TailwindCSS, and Framer Motion to provide citizens with an efficient digital alternative to traditional physical queues.

## 🎯 Features

### Core Functionality
- **Digital Ticket Generation** - Citizens can select office, department, and service to generate a digital queue ticket
- **Real-time Queue Status** - Live updates on current serving token, queue position, and estimated wait times
- **Operator Dashboard** - Staff interface for managing queue, calling next ticket, and marking services complete
- **Citizen Feedback System** - Star rating and text feedback collection post-service
- **Analytics Dashboard** - Comprehensive service statistics and performance metrics

### Technical Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern Animations** - Smooth transitions and interactions using Framer Motion
- **Simulated Real-time Updates** - Queue progression and notifications without backend
- **Professional UI** - Government-appropriate color scheme and typography
- **Error Handling** - Comprehensive error boundaries and user-friendly error states

## 🚀 Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Styling**: TailwindCSS with custom government theme
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Data Management**: JSON files with React state

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── LoadingSpinner.jsx
│   ├── ErrorBoundary.jsx
│   └── FloatingFeedbackButton.jsx
├── pages/               # Main application pages
│   ├── LandingPage.jsx
│   ├── GetTicketPage.jsx
│   ├── QueueStatusPage.jsx
│   ├── OperatorDashboard.jsx
│   ├── FeedbackPage.jsx
│   ├── AnalyticsPage.jsx
│   └── NotFoundPage.jsx
├── data/                # Mock data files
│   ├── services.json    # Government offices, departments, and services
│   ├── queue.json       # Current queue state and counters
│   ├── tickets.json     # Ticket history and tracking
│   └── analytics.json   # Performance metrics and statistics
├── utils/               # Helper functions
│   └── helpers.js       # Utility functions for formatting, calculations
├── App.jsx              # Main application component with routing
└── main.jsx             # Application entry point
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Government Blue (#0ea5e9, #0284c7, #0369a1)
- **Neutrals**: Clean whites and grays for readability
- **Accents**: Status-appropriate colors (green for success, yellow for warning, etc.)

### Typography
- **Font**: Inter for modern, professional appearance
- **Hierarchy**: Clear heading structure with appropriate sizing

### Animation Principles
- **Subtle Entrance**: Fade-in and slide-up animations
- **Interactive Feedback**: Hover and click states with scale effects
- **Progress Indication**: Animated progress bars and number counters
- **State Transitions**: Smooth transitions between application states

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd government-ticketing-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The application will reload automatically when you make changes

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Application Pages

### 1. Landing Page (`/`)
- **Hero Section**: Introduction to the digital queue system
- **Features Overview**: Benefits of digital ticketing
- **Quick Actions**: Direct links to main functionality
- **Statistics Display**: Today's service metrics

### 2. Get Ticket Page (`/get-ticket`)
- **Multi-step Wizard**: Office → Department → Service selection
- **Progress Indicator**: Visual progress through ticket generation
- **Ticket Display**: Generated token with QR code styling
- **Service Summary**: Confirmation of selected service details

### 3. Queue Status Page (`/queue-status`)
- **Token Search**: Find your position in queue
- **Current Serving Display**: Who's being served now
- **Queue Overview**: List of pending tickets
- **Real-time Updates**: Auto-refresh functionality

### 4. Operator Dashboard (`/operator`)
- **Counter Management**: Switch between different service counters
- **Queue Control**: Call next, complete service, mark no-show
- **Activity Feed**: Recent actions and notifications
- **Service Statistics**: Department-specific metrics

### 5. Feedback Page (`/feedback`)
- **Star Rating System**: Interactive 1-5 star rating
- **Text Feedback**: Optional detailed comments
- **Quick Tags**: Pre-defined feedback options
- **Submission Confirmation**: Thank you state with summary

### 6. Analytics Dashboard (`/analytics`)
- **Key Metrics**: Total tickets, completion rate, average wait time
- **Visual Charts**: Weekly trends, hourly distribution
- **Department Performance**: Comparative statistics
- **Satisfaction Metrics**: Rating breakdown and insights

## 🔧 Customization

### Adding New Services
1. Update `src/data/services.json` with new offices, departments, or services
2. The application will automatically reflect these changes

### Styling Modifications
1. Update `tailwind.config.js` for theme changes
2. Modify `src/index.css` for global styles
3. Component-specific styling in individual files

### Animation Adjustments
1. Modify Framer Motion variants in components
2. Update duration and easing in animation configs
3. Add new animations using the established patterns

## 📊 Data Simulation

The application uses JSON files to simulate backend responses:

- **Services Data**: Hierarchical structure of government services
- **Queue Management**: Current state with real-time simulation
- **Ticket Tracking**: Historical data and status updates
- **Analytics**: Aggregated statistics and performance metrics

## 🎯 Key Features Demo

1. **Ticket Generation Flow**
   - Navigate through office/department/service selection
   - Generate animated ticket with token number
   - View estimated wait time and queue position

2. **Queue Management**
   - Search for your ticket in the queue
   - See real-time position updates
   - Receive notifications when it's your turn

3. **Operator Interface**
   - Call next person in queue
   - Mark services as complete or no-show
   - Track department-specific performance

4. **Feedback Collection**
   - Submit star ratings and comments
   - Use quick feedback tags
   - View confirmation and summary

5. **Analytics Visualization**
   - Interactive charts and graphs
   - Performance metrics across departments
   - Satisfaction ratings and trends

## 🚀 Future Enhancements

- **Mobile App**: React Native version for mobile devices
- **Print Functionality**: Physical ticket printing capability
- **SMS Notifications**: Text updates on queue status
- **Multi-language Support**: Internationalization for diverse populations
- **Accessibility**: Enhanced ARIA labels and keyboard navigation
- **PWA Features**: Offline capability and push notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern government service portals
- **Icons**: Lucide React icon library
- **Charts**: Recharts for beautiful data visualization
- **Animations**: Framer Motion for smooth interactions

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
