import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import ReduxProvider from '../components/ReduxProvider';
import CustomNavbar from '../components/CustomNavbar';

export const metadata = {
  title: 'My Blog',
  description: 'Next.js Blog with Redux',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#1a1d24', color: '#ffffff', minHeight: '100vh' }}>
        <ReduxProvider>
          <CustomNavbar />
          <div className="container mt-4">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}