import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Alert from './Alert';

const NOT_FOUND = 404;

export default function ErrorBoundary() {
  const error = useRouteError();

  const message = (isRouteErrorResponse(error) && error.status === NOT_FOUND) ?
    '404! The page you were looking for does not exist!'
    :
    'Something went wrong!';

  return <Alert message={message} />;
}
