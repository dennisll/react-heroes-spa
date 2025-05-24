
import { Route, Routes } from 'react-router-dom'
import { HeroRoutes } from "../heroes";
import { LoginPages } from "../auth";
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <>
            <Routes>

               {/*  esta seria otra variante colocando cada ruta en particular
                <Route path="/login*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path='/*' element={<LoginPages />} />
                        </Routes>
                    </PublicRoute>
                }
                /> */}

                <Route path="login" element={
                    <PublicRoute>
                        <LoginPages />
                    </PublicRoute>
                } />

                <Route path="/*" element={
                    <PrivateRoute>
                        <HeroRoutes />
                    </PrivateRoute>
                } />


            </Routes>
        </>
    )
}

