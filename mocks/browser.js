import { setupWorker } from 'msw/browser';
import handlers from './handlers';

const worker = setupWorker(...handlers);

await worker.start({
  onUnhandledRequest: (req, print) => {
    if (req.url.href === import.meta.env.VITE_API_URL) print.warning();
  },
});
