

import React, { useContext, useMemo } from 'react'
import { AuthContext } from '../auth'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

  const { logged } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  //memoriza este resultado entre render a memos que cambien las dependencias entre corchetes,
  //otra opcion seria usar un useEffect
  const lastPath = useMemo(() => (pathname + search), [pathname, search]);

  // guardamos la ultima ruta navegada
  localStorage.setItem('lastPath', lastPath);

  return (logged)
    ? children
    : <Navigate to="/login" />
}

