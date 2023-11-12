import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import client from '@/client';
import routes from '@/routes';
import App from '@/App';

const router = createBrowserRouter(routes);
const root = createRoot(document.getElementById('root'));

root.render(<App client={client} router={router} />);
